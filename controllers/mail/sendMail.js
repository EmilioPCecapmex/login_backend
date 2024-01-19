const nodemailer = require("nodemailer");
const { emailTemplate } = require("../mail/newUser");
const util = require('util');

const transporter = nodemailer.createTransport({
  host: process.env.LOGIN_B_APP_EMAIL_HOST,
  port: process.env.LOGIN_B_APP_EMAIL_PORT,
  secure: process.env.LOGIN_B_APP_EMAIL_SECURE === "TRUE",
  auth: {
    user: process.env.LOGIN_B_APP_EMAIL_USERNAME,
    pass: process.env.LOGIN_B_APP_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMailPromise = util.promisify(transporter.sendMail).bind(transporter);

const sendEmail = async (mailData) => {
  console.log(JSON.stringify({
    host: process.env.LOGIN_B_APP_EMAIL_HOST,
    port: process.env.LOGIN_B_APP_EMAIL_PORT,
    secure: process.env.LOGIN_B_APP_EMAIL_SECURE === "TRUE",
    auth: {
      user: process.env.LOGIN_B_APP_EMAIL_USERNAME,
      pass: "$ist3m@$tv*",
      // process.env.LOGIN_B_APP_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  }));
  const { to, subject, nombre, usuario, contrasena, userid, mensaje } = mailData;

  const mailOptions = {
    from: process.env.LOGIN_B_APP_EMAIL_USER,
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
