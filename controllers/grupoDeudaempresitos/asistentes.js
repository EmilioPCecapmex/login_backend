const generateEmailTemplate = require("../../controllers/mail/DeudaYEmprestitos/emailRegistro.js"); // ← plantilla HTML
const db = require("../../config/db.js");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
// === Validar variables de entorno ===
[
  "LOGIN_B_APP_EMAIL_HOST",
  "LOGIN_B_APP_EMAIL_PORT",
  "LOGIN_B_APP_EMAIL_SECURE",
  "DEUDA_EMAIL_USERNAME",
  "DEUDA_EMAIL_PASSWORD",
  "DEUDA_EMAIL_USER",
  "LOGIN_B_APP_EMAIL_USER_ALERTS"
].forEach(envVar => {
  console.error(`variable de entorno: ${process.env[envVar]}`);
  if (!process.env[envVar]) {
    console.error(`❌ Falta la variable de entorno: ${envVar}`);
  }
});

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.LOGIN_B_APP_EMAIL_HOST,
  port: parseInt(process.env.LOGIN_B_APP_EMAIL_PORT, 10),
  secure: process.env.LOGIN_B_APP_EMAIL_SECURE === "TRUE",
  auth: {
    user: process.env.DEUDA_EMAIL_USERNAME,
    pass: process.env.DEUDA_EMAIL_PASSWORD
  }
});

// Correos de notificación
const EMAIL_INFORMATION = process.env.LOGIN_B_APP_EMAIL_USER_ALERTS;
const EMAIL_NOTIFICATION = process.env.LOGIN_B_APP_EMAIL_USER_NOTIFICATION;

module.exports = {
  createGrupoDeuda: (req, res) => {
    const body = req.body;
    // === Guardar logs ===
    const logsDir = path.join(__dirname, "../../logs");
    const logsFile = path.join(logsDir, "grupo_deuda_requests.json");

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
          { from: process.env.DEUDA_EMAIL_USER, to, bcc, subject, html: htmlContent },
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
      "nombre", "aPaterno", "cargo", "entidadFederativa", "tpoInvitacion",
      "sector", "nivelGobierno", "dependencia", "hotel", "fAsistencia",
      "fhSalida", "correo", "telefono", "Celular", "medioTransporte",
      "proveedorTransporte", "fhLlegada"
    ];
    const missingFields = requiredFields.filter(f => !body[f]);

    if (missingFields.length > 0) {
      const errorMsg = `Faltan campos obligatorios: ${missingFields.join(", ")}`;
      saveLog("error", errorMsg, null);
      const htmlError = generateEmailTemplate(body, false);
      sendEmail(EMAIL_INFORMATION, null, "❌ Registro Fallido - Grupo Deuda", htmlError, "error");
      return res.status(400).send({ msg: errorMsg });
    }

    // Generar UUID
    const id = uuidv4();

    const sql = `
    INSERT INTO Grupo_Deuda_Emprestitos (
      id, nombre, aPaterno, aMaterno, cargo, entidadFederativa, tpoInvitacion, sector,
      nivelGobierno, dependencia, pais, hotel, fAsistencia, fhSalida, correo, telefono,
      Extension, Celular, medioTransporte, proveedorTransporte, fhLlegada
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const params = [
      id,
      body.nombre, body.aPaterno, body.aMaterno || null, body.cargo,
      body.entidadFederativa, body.tpoInvitacion, body.sector, body.nivelGobierno,
      body.dependencia, body.pais || 'México', body.hotel, body.fAsistencia, body.fhSalida, body.correo,
      body.telefono, body.Extension || null, body.Celular, body.medioTransporte,
      body.proveedorTransporte, body.fhLlegada
    ];

    db.query(sql, params, async (err) => {
      if (err) {
        console.error("❌ Error en DB:", err.message);
        saveLog("error", err.message, null);
        const htmlError = generateEmailTemplate(body, false);
        await sendEmail(EMAIL_INFORMATION, null, "❌ ERROR EN REGISTRO - CUARTA REUNIÓN DEL GRUPO DE DEUDA Y EMPRÉSTITOS 2024-2025", htmlError, "error");
        return res.status(500).send({ error: err });
      }

      console.log(`✅ Registro insertado con ID: ${id}`);

      // Generar enlace de confirmación usando el UUID
      const confirmUrl = `${process.env.APP_URL}/registro-asistencia-deuda-emprestitos/confirmacion?id=${id}`;

      // Plantilla con botón de confirmación
      const htmlExito = generateEmailTemplate(body, true, confirmUrl);

      await sendEmail(
        body.correo,
        EMAIL_NOTIFICATION,
        "✅ REGISTRO EXITOSO - CUARTA REUNIÓN DEL GRUPO DE DEUDA Y EMPRÉSTITOS 2024-2025",
        htmlExito,
        "exito"
      );

      return res.status(201).send({
        msg: "¡Registro exitoso!",
        id
      });
    });
  },

  confirmGrupoDeuda: (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send('ID requerido');
  }

  const sql = `
    UPDATE Grupo_Deuda_Emprestitos
    SET confirmado = 1,
        fConfirmado = NOW()
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al confirmar asistencia:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Registro no encontrado o ya confirmado');
    }

    res.send(`
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Confirmación exitosa</title>
        </head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #28a745;">✅ Asistencia confirmada</h1>
          <p>Gracias por confirmar tu asistencia a la CUARTA REUNIÓN DEL GRUPO DE DEUDA Y EMPRÉSTITOS 2024-2025.</p>
        </body>
      </html>
    `);
  });
}
};