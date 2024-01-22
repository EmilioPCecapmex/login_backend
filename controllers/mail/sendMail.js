const nodemailer = require("nodemailer");
const { emailTemplate } = require("../mail/newUser");
const util = require('util');

const transporter = nodemailer.createTransport({
  host: 'correo.nl.gob.mx',
  port: 587,
  secure: false,
  // process.env.LOGIN_B_APP_EMAIL_SECURE === "TRUE",
  auth: {
    user: "sistemas.tv",
    pass: "$ist3m@$tv*",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMailPromise = util.promisify(transporter.sendMail).bind(transporter);

const sendEmail = async (mailData) => {
  const { to, subject, nombre, usuario, contrasena, userid, mensaje } = mailData;
 
  const mailOptions = {
    from: "sistemas.tesoreria.virtual@nuevoleon.gob.mx",
    to: to,
    subject: subject,
    text: "Plaintext version of the message",
    html: emailTemplate(mensaje, nombre, usuario, contrasena, userid),
  };

  try {
    const info = await sendMailPromise(mailOptions);
    return "Correo enviado con éxito:", info.response;
  } catch (error) {
    throw "Error al enviar el correo:", error;
  }
};

module.exports = {
  sendEmail: sendEmail,
};
