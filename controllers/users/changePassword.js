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
                subject: "¡Recuperación de contraseña exitosa!",
                nombre: userData.Nombre,
                usuario: userData.NombreUsuario,
                contrasena: genPassword,
                userid: userData.Id,
                mensaje: "Su contraseña se actualizada con éxito",
              };
              // sendEmail(d);
            }

            return res.status(200).send({
              message: "Cambio de contraseña exitoso!",
            });
          }
        );
      }
    });
  },

  setPassword: (req, res) => {
    const userId = req.body.IdUsuario;
    const password = req.body.ContrasenaActual;
    const newPassword = req.body.ContrasenaNueva;


      // Verificar la longitud mínima (al menos 10 caracteres)
      if (newPassword.length < 8) {
        return res.status(409).send({
          error: "longuitud minima 8 caracteres",
        });
      }
    
      // Verificar si contiene al menos un número
      if (!/\d/.test(newPassword)) {
        return res.status(409).send({
          error: "la contraseña debe contener almenos un dígito",
        });
      }
    
      // Verificar si solo contiene letras (mayúsculas o minúsculas) y números
      if (!/^[a-zA-Z0-9]+$/.test(newPassword)) {
        return res.status(409).send({
          error: "la contraseña no puede contener caracteres especiales",
        });
      }
    
     
    let actualpassword = "";

    let query = `Select Contrasena From TiCentral.Usuarios Where Id=?;`;
    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.status(401).send({
          error: "Error",
        });
      }
      actualpassword = result[0].Contrasena || "";

      bcrypt.compare(password, actualpassword, (bErr, bResult) => {
        if (bErr) {
          return res.status(401).send({
            error: "Contraseña Incorrecta",
          });
        }
        if (bResult) {
          bcrypt.hash(newPassword, 10, (err, hash) => {
            if (err) {
              return res.status(409).send({
                error: "Error",
              });
            } else {
              db.query(
                `CALL sp_CambiarContrasena('${userId}','${hash}')`,
                (err, result) => {
                  if (err) {
                    return res.status(409).send({
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
                      subject: "¡Actualizacion de Contraseña!",
                      nombre: userData.Nombre,
                      usuario: userData.NombreUsuario,
                      contrasena: newPassword,
                      userid: userData.Id,
                      mensaje:"tu contraseña a sido actualizada exitosamente."
                    };
                    // sendEmail(d);
                  }

                  return res.status(200).send({
                    message: "Cambio de contraseña exitoso!",
                  });
                }
              );
            }
          });
        } else {
          return res.status(401).send({
            error: "Contraseña Incorrecta",
          });
        }
      });
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
                mensaje:"le informamos que se ha generado una nueva contraseña para su cuenta. A continuación, encontrará los detalles de su nueva contraseña:"
              };
              // sendEmail(d);
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
