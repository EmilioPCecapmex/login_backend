//hwlkhhcgqytvnkba
var nodemailer = require("nodemailer");
const { emailTemplate } = require("../mail/newUser");

module.exports = {
  sendEmail: (req) => {
    const mailData = req;

    var to = mailData.to;
    var subject = mailData.subject;
    var nombre = mailData.nombre;
    var usuario = mailData.usuario;
    var contrasena = mailData.contrasena;
    var userid = mailData.userid;

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // enter your email address
        pass: process.env.EMAIL_PASSWORD, // enter your visible/encripted password
      },
      tls : { rejectUnauthorized: false }

    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: "Plaintext version of the message",
      html: emailTemplate(nombre, usuario, contrasena, userid),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw error;
      } else {
        return res.status(201).send({
          msg: "¡Email enviado!",
          info: info.response,
        });
      }
    });
  },
};
