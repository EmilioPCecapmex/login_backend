const generateEmailTemplate = require("../../controllers/mail/DeudaYEmprestitos/emailRegistro.js"); // ← plantilla HTML
const db = require("../../config/db.js");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
// === Validar variables de entorno ===
[
  "LOGIN_B_APP_EMAIL_HOST",
  "LOGIN_B_APP_EMAIL_PORT",
  "LOGIN_B_APP_EMAIL_SECURE",
  "LOGIN_B_APP_EMAIL_USERNAME",
  "LOGIN_B_APP_EMAIL_PASSWORD",
  "LOGIN_B_APP_EMAIL_USER_NOTIFICATION",
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
    user: process.env.LOGIN_B_APP_EMAIL_USERNAME,
    pass: process.env.LOGIN_B_APP_EMAIL_PASSWORD
  }
});

// Correos de notificación
const EMAIL_EXITO = process.env.LOGIN_B_APP_EMAIL_USER_NOTIFICATION;
const EMAIL_ERROR = process.env.LOGIN_B_APP_EMAIL_USER_ALERTS;

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
          { from: process.env.LOGIN_B_APP_EMAIL_USERNAME, to, bcc, subject, html: htmlContent },
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
      console.warn(`⚠ ${errorMsg}`);
      saveLog("error", errorMsg, null);
      const htmlError = generateEmailTemplate(body, false);
      sendEmail(EMAIL_ERROR, null, "❌ Registro Fallido - Grupo Deuda", htmlError, "error");
      return res.status(400).send({ msg: errorMsg });
    }

    // === Insertar en BD ===
    const sql = `
      INSERT INTO Grupo_Deuda_Emprestitos (
        nombre, aPaterno, aMaterno, cargo, entidadFederativa, tpoInvitacion, sector,
        nivelGobierno, dependencia, hotel, fAsistencia, fhSalida, correo, telefono,
        Extension, Celular, medioTransporte, proveedorTransporte, fhLlegada
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      body.nombre, body.aPaterno, body.aMaterno || null, body.cargo,
      body.entidadFederativa, body.tpoInvitacion, body.sector, body.nivelGobierno,
      body.dependencia, body.hotel, body.fAsistencia, body.fhSalida, body.correo,
      body.telefono, body.Extension || null, body.Celular, body.medioTransporte,
      body.proveedorTransporte, body.fhLlegada
    ];

    db.query(sql, params, async (err, result) => {
      if (err) {
        console.error("❌ Error en DB:", err.message);
        saveLog("error", err.message, null);
        const htmlError = generateEmailTemplate(body, false);
        await sendEmail(EMAIL_ERROR, null, "❌ Error en Registro - Grupo Deuda", htmlError, "error");
        return res.status(500).send({ error: err });
      }

      console.log(`✅ Registro insertado con ID: ${result.insertId}`);
      const htmlExito = generateEmailTemplate(body, true);
      await sendEmail(EMAIL_EXITO, EMAIL_ERROR, "✅ Registro Exitoso - Grupo Deuda", htmlExito, "exito");

      return res.status(201).send({
        msg: "¡Registro exitoso!",
        
      });
    });
  }
};
