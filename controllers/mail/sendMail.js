const nodemailer = require("nodemailer");
const { emailTemplate } = require("../mail/newUser");
const util = require('util');

const transporter = nodemailer.createTransport({
  host: "correo.nl.gob.mx",
  port: 587,
  secure: false,
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
    return { message: "Correo enviado con éxito", response: info.response };
  } catch (error) {
    throw { message: "Error al enviar el correo", error: error };
  }
};

module.exports = {
  sendEmail: sendEmail,
};
