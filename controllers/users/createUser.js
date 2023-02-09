const { generateRandomPassword } = require("./createPassword");
const db = require("../../config/db.js");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../mail/sendMail");

module.exports = {
  createUser: (req, res) => {
    const userData = req.body;
    
    db.query(
      `CALL sp_ExisteUsuario(${db.escape(userData.NombreUsuario)},${db.escape(
        userData.CorreoElectronico
      )})`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        const ExisteUsuario = result[0][0].ExisteUsuario;
        const ExisteCorreoElectronico = result[0][0].ExisteCorreoElectronico;

        if (ExisteUsuario || ExisteCorreoElectronico) {
          if (ExisteUsuario > 0) {
            return res.status(409).send({
              msg: "Nombre de usuario actualmente en uso.",
            });
          } else if (ExisteCorreoElectronico > 0) {
            return res.status(409).send({
              msg: "Correo electronico actualmente en uso.",
            });
          }
        } else {
          // username is available
          const genPassword = generateRandomPassword(10);
          bcrypt.hash(genPassword, 10, (err, hash) => {
            if (err) {
              return res.status(401).send({
                error: "Error",
              });
            } else {
              // has hashed pw => add to database
              db.query(
                `CALL sp_CrearUsuario (
                      ${db.escape(userData.Nombre)},
                      ${db.escape(userData.ApellidoPaterno)},
                      ${db.escape(userData.ApellidoMaterno)},
                      ${db.escape(userData.NombreUsuario)},
                    ${db.escape(userData.CorreoElectronico)}, 
                     ${db.escape(hash)},
                     ${db.escape(userData.IdUsuarioModificador)},
                     ${db.escape(userData.Curp)},
                     ${db.escape(userData.Rfc)},
                     ${db.escape(userData.Telefono)},
                     ${db.escape(userData.Ext)},
                     ${db.escape(userData.Celular)},
                     ${db.escape(userData.IdTipoUsuario)},
                     ${db.escape(userData.PuedeFirmar)}
                     )`,

                (err, result) => {
                  if (err) {

                    return res.status(500).send({

                      error: "Error",
                    });
                  } else {
                    var userId = result[0][0].Id;

                    const d = {
                      to: userData.CorreoElectronico,
                      subject: "¡Bienvenido!",
                      nombre: userData.Nombre,
                      usuario: userData.NombreUsuario,
                      contrasena: genPassword,
                      userid: userId,
                    };
                    sendEmail(d);
                  }
                  if(result[0][0].Respuesta == 201){
                     return res.status(201).send({
                    msg: "¡Registro exitoso!",
                    IdUsuario: userId
                  });
                  }else{
                     return res.status(409).send({
                    msg: result[0][0].Mensaje,
                    IdUsuario: userId
                  });
                  }
                }
              );
            }
          });
        }
      }
    );
  },
};
