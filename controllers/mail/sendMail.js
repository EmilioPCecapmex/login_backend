const axios = require("axios");
const { escribirRegistro } = require("../../logger/logger");
const https = require("https");

const agent = new https.Agent({ rejectUnauthorized: false });

const ENDPOINT_SEND_MAIL =
  "https://tesoreria-virtual-servicios.nl.gob.mx/api/ApiDoc/correo/envia-pass";

// ========================================================
// ENVÍA CORREO USANDO EL NUEVO endpoint /correo/envia-pass
// TOKEN ENTRANTE ES REENVIADO
// ========================================================

const sendEmail = async (mailData) => {
  console.log("mailData:", mailData);

  const {
    to,
    subject,
    usuario,
    tipo,
    token,               // ← token que llega del frontend
    contrasena           // ← así viene realmente
  } = mailData;

  if (!token) {
    throw new Error("El token no fue proporcionado en mailData.token");
  }

  // Body EXACTO que pide Laravel
  const body = {
    password: contrasena || "SinPass",
    tipo: tipo || "restablecido",
    correo: to,
    usuario: usuario || "desconocido"
  };

  try {
    const response = await axios.post(ENDPOINT_SEND_MAIL, body, {
      timeout: 15000,
      httpsAgent: agent,
      headers: {
        Authorization: `Bearer ${token}`,   // ← FORWARD REAL DEL JWT
        "Content-Type": "application/json"
      }
    });

    escribirRegistro(`Correo: ${to}, Asunto:${subject}, Status: Exito`);
    return response.data;

  } catch (error) {
    const detalle = error.response?.data || error.message;

    console.error("ERROR COMPLETO:", JSON.stringify(detalle, null, 2));

    escribirRegistro(
      `Correo SICSA: ${to}, Asunto:${subject}, Status: Error -> ${JSON.stringify(detalle)}`
    );

    throw new Error(`Error al enviar el correo: ${JSON.stringify(detalle)}`);
  }
};

module.exports = {
  sendEmail
};
