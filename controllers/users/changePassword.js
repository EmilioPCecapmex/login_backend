const db = require("../../config/db.js");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../mail/sendMail");
const { generateRandomPassword } = require("./createPassword");

module.exports = {
  changePassword: (req, res) => {
    const userId = req.body.IdUsuario;
    const genPassword = req.body.ContrasenaNueva;


    bcrypt.hash(genPassword, 10, (err, hash) => {
      if (err) {
        return res.status(401).send({
          error: "Error",
        });
      } else {
        // has hashed pw => add to database
        db.query(
          `CALL sp_CambiarContrasena('${userId}','${hash}')`,
          (err, result) => {
       
            if (err) {
              return res.status(401).send({
                error: "Error",
              });
            } else {
              const message = result[0][0].message;
              const userData = result[0][0];

              if (message !== undefined) {
                return res.status(409).send({
                  error: message,
                });
              }
              const d = {
                to: userData.CorreoElectronico,
                subject: "¡Cambio de Contraseña!",
                nombre: userData.Nombre,
                usuario: userData.NombreUsuario,
                contrasena: genPassword,
                userid: userData.Id,
              };
              sendEmail(d);
            }

            return res.status(200).send({
              message: "Cambio de contraseña exitoso!",
            });
          }
        );
      }
    });
  },
  forgotPassword: (req, res) => {
    const user = req.body.NombreUsuario;
    const genPassword = generateRandomPassword(10);
    bcrypt.hash(genPassword, 10, (err, hash) => {
      if (err) {
        return res.status(401).send({
          error: "Error",
        });
      } else {
        // has hashed pw => add to database
        db.query(
          `CALL sp_OlvideContrasena('${user}','${hash}')`,
          (err, result) => {
            if (err) {
              return res.status(401).send({
                error: "Error",
              });
            } else {
              const userData = result[0][0];
              if (userData === undefined) {
                return res.status(409).send({
                  error: "Verificar Id Usuario",
                });
              }
              const d = {
                to: userData.CorreoElectronico,
                subject: "¡Cambio de Contraseña!",
                nombre: userData.Nombre,
                usuario: userData.NombreUsuario,
                contrasena: genPassword,
                userid: userData.Id,
              };
              sendEmail(d);
            }

            return res.status(200).send({
              message: "Cambio de contraseña exitoso!",
            });
          }
        );
      }
    });
  },
};
