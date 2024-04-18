const nodemailer = require("nodemailer");
const { emailTemplate } = require("../mail/newUser");
const util = require('util');
const { emailVinculacionTemplate } = require("./confirmacionVinculacion");

const transporter = nodemailer.createTransport({
  host: // process.env.LOGIN_B_APP_EMAIL_HOST,
  'correo.nl.gob.mx',
  port: // process.env.LOGIN_B_APP_EMAIL_PORT,
  587,
  secure:  //process.env.LOGIN_B_APP_EMAIL_SECURE === "TRUE",
  false,
  auth: {
     user: "sistemas.tv",
     pass: "$ist3m@$tv*",
    //user: process.env.LOGIN_B_APP_EMAIL_USERNAME,
    //pass: process.env.LOGIN_B_APP_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMailPromise = util.promisify(transporter.sendMail).bind(transporter);

const sendEmail = async (mailData) => {
  const { to, subject, nombre, usuario, contrasena, userid, mensaje } = mailData;
 
  const mailOptions = {
    from://  process.env.LOGIN_B_APP_EMAIL_USER,
    "sistemas.tesoreria.virtual@nuevoleon.gob.mx",
    to: to,
    subject: subject,
    text: "Plaintext version of the message",
    html: emailTemplate(mensaje, nombre, usuario, contrasena, userid),
  };
  console.log('mailOptions',mailOptions);
  try {
    const info = await sendMailPromise(mailOptions);
    return "Correo enviado con éxito:", info.response;
  } catch (error) {
    throw "Error al enviar el correo:", error;
  }
};

const sendEmailVinculacion = async (mailData) => {
  const { to, subject, nombre, usuario, userid, mensaje } = mailData;
 
  const mailOptions = {
    from: //process.env.LOGIN_B_APP_EMAIL_USER,
     "sistemas.tesoreria.virtual@nuevoleon.gob.mx",
    to: to,
    subject: subject,
    text: "Plaintext version of the message",
    html: emailVinculacionTemplate(mensaje, nombre, usuario, userid),
  };
  console.log('mailOptions',mailOptions);
  try {
    const info = await sendMailPromise(mailOptions);
    console.log("Correo enviado con éxito:");
    return "Correo enviado con éxito:", info.response;
  } catch (error) {
    console.log("Error al enviar el correo:");
    throw "Error al enviar el correo:", error;
  }
};

module.exports = {
  sendEmail: sendEmail,
  sendEmailVinculacion:sendEmailVinculacion,
};

