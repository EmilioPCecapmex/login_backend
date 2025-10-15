const generateEmailTemplate = require("../../controllers/mail/SemanaFormacion/emailRegistro.js");
const db = require("../../config/db.js");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');

// === Validar variables de entorno ===
[
  "ARMONIZACION_CONTABLE_EMAIL_HOST",
  "ARMONIZACION_CONTABLE_EMAIL_PORT",
  "ARMONIZACION_CONTABLE_EMAIL_USERNAME",
  "ARMONIZACION_CONTABLE_EMAIL_PASSWORD",
  "ARMONIZACION_CONTABLE_EMAIL_USER",
  "LOGIN_B_APP_EMAIL_USER_ALERTS"
].forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`⚠️ Falta la variable de entorno: ${envVar}`);
  }
});

// === Configuración de nodemailer ===
const transporter = nodemailer.createTransport({
  host: process.env.ARMONIZACION_CONTABLE_EMAIL_HOST,
  port: parseInt(process.env.ARMONIZACION_CONTABLE_EMAIL_PORT || 587, 10),
  secure: false,
  auth: {
    user: process.env.ARMONIZACION_CONTABLE_EMAIL_USERNAME,
    pass: process.env.ARMONIZACION_CONTABLE_EMAIL_PASSWORD
  }
});

const EMAIL_INFORMATION = process.env.LOGIN_B_APP_EMAIL_USER_ALERTS;
const EMAIL_NOTIFICATION = process.env.ARMONIZACION_CONTABLE_EMAIL_USER_NOTIFICATION;

module.exports = {

  createInvitado: (req, res) => {
    const body = req.body;

    // === Registro de logs ===
    const logsDir = path.join(__dirname, "../../logs");
    const logsFile = path.join(logsDir, "invitados_requests.json");

    const saveLog = (status, errorMsg = null, emailStatus = null) => {
      try {
        if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

        let logsArray = [];
        if (fs.existsSync(logsFile)) {
          const existingData = fs.readFileSync(logsFile, "utf8");
          try { logsArray = JSON.parse(existingData); } catch { logsArray = []; }
        }

        logsArray.push({
          fecha: new Date().toISOString(),
          body,
          status,
          error: errorMsg,
          emailEnviado: emailStatus
        });

        fs.writeFileSync(logsFile, JSON.stringify(logsArray, null, 2), "utf8");
      } catch (err) {
        console.error("❌ Error guardando log:", err);
      }
    };

    const sendEmail = (to, bcc, subject, htmlContent, statusType) => {
      return new Promise((resolve) => {
        transporter.sendMail(
          { from: process.env.ARMONIZACION_CONTABLE_EMAIL_USER, to, bcc, subject, html: htmlContent },
          (err, info) => {
            if (err) {
              console.error(`❌ Error enviando correo [${statusType}]:`, err);
              saveLog(statusType, null, false);
              return resolve(false);
            } else {
              console.log(`📧 Correo enviado [${statusType}]:`, info.response);
              saveLog(statusType, null, true);
              return resolve(true);
            }
          }
        );
      });
    };

    // === Validar campos obligatorios ===
    const requiredFields = [
      "nombre", "aPaterno", "correo", "asistencia", "dependencia"
    ];
    const missingFields = requiredFields.filter(f => !body[f]);

    if (missingFields.length > 0) {
      const errorMsg = `Faltan campos obligatorios: ${missingFields.join(", ")}`;
      saveLog("error", errorMsg, null);
      const htmlError = generateEmailTemplate(body, false);
      sendEmail(EMAIL_INFORMATION, null, "❌ Error en registro - Semana de Formación en Armonización Contable", htmlError, "error");
      return res.status(400).send({ msg: errorMsg });
    }

    // === Insertar registro ===
    const id = uuidv4();

    const sql = `
      INSERT INTO Semana_Formacion_Armonizacion_Contable.Invitados (
        id, nombre, aPaterno, aMaterno, cargo, tpoInvitacion, municipioFideicomiso,
        asistencia, sector, nivelGobierno, dependencia, fAsistencia, correo,
        telefono, Extension, Celular
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      id,
      body.nombre,
      body.aPaterno,
      body.aMaterno || null,
      body.cargo || null,
      body.tpoInvitacion || null,
      body.municipioFideicomiso || null,
      body.asistencia || null,
      body.sector || null,
      body.nivelGobierno || null,
      body.dependencia || null,
      body.fAsistencia || null,
      body.correo || null,
      body.telefono || null,
      body.Extension || null,
      body.Celular || null
    ];

    db.query(sql, params, async (err) => {
      if (err) {
        console.error("❌ Error en DB:", err.message);
        saveLog("error", err.message, null);
        const htmlError = generateEmailTemplate(body, false);
        await sendEmail(EMAIL_INFORMATION, null, "❌ Error en registro - Semana de Formación en Armonización Contable", htmlError, "error");
        return res.status(500).send({ error: err });
      }

      console.log(`✅ Registro insertado con ID: ${id}`);
      const confirmUrl = `${process.env.APP_URL}/registro-armonizacion/confirmacion?id=${id}`;
      const htmlExito = generateEmailTemplate(body, true, confirmUrl);

      await sendEmail(
        body.correo,
        EMAIL_NOTIFICATION,
        "✅ Registro exitoso - Semana de Formación en Armonización Contable",
        htmlExito,
        "exito"
      );

      return res.status(201).send({
        msg: "¡Registro exitoso!",
        id
      });
    });
  },

//   confirmInvitado: (req, res) => {
//     const { id } = req.query;
// 
//     if (!id) {
//       return res.status(400).send('ID requerido');
//     }
// 
//     const sql = `
//       UPDATE Invitados
//       SET fechaRegistro = NOW()
//       WHERE id = ?
//     `;
// 
//     db.query(sql, [id], (err, result) => {
//       if (err) {
//         console.error('Error al confirmar asistencia:', err);
//         return res.status(500).send('Error interno del servidor');
//       }
// 
//       if (result.affectedRows === 0) {
//         return res.status(404).send('Registro no encontrado');
//       }
// 
//       res.send(`
//         <html>
//           <head><meta charset="UTF-8"><title>Confirmación exitosa</title></head>
//           <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
//             <h1 style="color: #28a745;">✅ Asistencia confirmada</h1>
//             <p>Gracias por confirmar tu asistencia a la <strong>Semana de Formación en Armonización Contable</strong>.</p>
//           </body>
//         </html>
//       `);
//     });
//   }
};
