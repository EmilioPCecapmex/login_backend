const db = require("../../config/db.js");
const { generateRandomPassword } = require("../users/createPassword.js");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../mail/sendMail");

module.exports = {
  aprobarSolicitud: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const IdSolicitud = req.body.IdSolicitud;
    const Estado = req.body.Estado;

    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese ID Usuario",
      });
    }
    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese ID Solicitud",
      });
    }
    if (Estado == null || /^[\s]*$/.test(Estado)) {
      return res.status(409).send({
        error: "Ingrese Estado",
      });
    }

    var nombre;
    var nusuario;
    var correo;

    db.query(
      `SELECT u.Nombre, u.NombreUsuario, u.CorreoElectronico FROM TiCentral.Usuarios AS u 
      INNER JOIN TiCentral.Solicitudes AS s ON u.Id = s.IdUsuario
      WHERE s.Id = '${IdSolicitud}'`,
      (error, result) => {
        if (error) {
          return res.status(500).send({
            error: "Error",
          });
        }
        nombre = result[0].Nombre;
        nusuario = result[0].NombreUsuario;
        correo = result[0].CorreoElectronico;
        const genPassword = generateRandomPassword(10);
        bcrypt.hash(genPassword, 10, (err, hash) => {
          if (err) {
            return res.status(401).send({
              error: "Error",
            });
          } else {
            db.query(
              `CALL sp_CambiaEstatusSolicitud('${IdUsuario}','${IdSolicitud}','${Estado}', '${hash}')`,
              (err, result) => {
                if (err) {
                  return res.status(500).send({
                    error: "Error",
                  });
                }
                if (result.length) {
                  const data = result[0][0];
                  if (data === undefined) {
                    return res.status(409).send({
                      error: "Verificar Id App",
                    });
                  }
                  const d = {
                    to: correo,
                    subject: "¡Bienvenido!",
                    nombre: nombre,
                    usuario: nusuario,
                    contrasena: genPassword,
                    userid: IdUsuario,
                  };
                  sendEmail(d);

                  return res.status(200).send({
                    result: data,
                  });
                } else {
                  return res.status(409).send({
                    error: "¡Sin Información!",
                  });
                }
              }
            );
          }
        });
      }
    );
  },
};
