const db = require("../../config/db.js");Error
const { generateRandomPassword } = require("../users/createPassword.js");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../mail/sendMail");

module.exports = {
  solicitudTransaction: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const IdSolicitud = req.body.IdSolicitud;
    const Estado = req.body.Estado;
<<<<<<< Updated upstream
    const TipoSoli= req.body.TipoSoli;
=======
    const TipoSoli = req.body.TipoSoli;
    const AdminPlataforma = req.body.AdminPlataforma;
    const PermisoFirma = req.body.PermisoFirma;

    if (AdminPlataforma == null || /^[\s]*$/.test(AdminPlataforma)) {
      return res.status(409).send({
        error: "Ingrese AdminPlataforma",
      });
    }
    if (PermisoFirma == null || /^[\s]*$/.test(PermisoFirma)) {
      return res.status(409).send({
        error: "Ingrese PermisoFirma",
      });
    }
>>>>>>> Stashed changes

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
    if (TipoSoli == null || /^[\s]*$/.test(TipoSoli)) {
      return res.status(409).send({
        error: "Ingrese Tipo Solicitud",
      });
    }

    var nombre;
    var nusuario;
    var correo;

    db.query(
      `SELECT Nombre, NombreUsuario, CorreoElectronico FROM TiCentral.Solicitudes
      WHERE Id = '${IdSolicitud}'`,
      (error, result) => {
        if (error) {
          return res.status(500).send({
            error: "Error emilio 1",
          });
        }
        nombre = result[0]?.Nombre;
        nusuario = result[0]?.NombreUsuario;
        correo = result[0]?.CorreoElectronico;
        const genPassword = generateRandomPassword(10);
        bcrypt.hash(genPassword, 10, (err, hash) => {
          if (err) {
            return res.status(401).send({
              error: "Error de emilio",
            });
          } else {
            db.query(
              `CALL sp_CambiaEstatusSolicitud('${IdUsuario}','${IdSolicitud}','${Estado}', '${hash}', '${TipoSoli}')`,
              (err, result) => {
                if (err) {
                  return res.status(500).send({
                    error: "Error mio",
                  });
                }
<<<<<<< Updated upstream
                if (result.length) {
                  const data = result[0][0];
                  if (data === undefined) {
                    return res.status(409).send({
                      error: "Verificar Id App",
                    });
                  }
=======

                if (
                  result[0][0].Respuesta == 201 &&
                  result[0][0].Mensaje == "Vinculación exitosa"
                ) {
>>>>>>> Stashed changes
                  const d = {
                    to: correo,
                    subject: "¡Bienvenido!",
                    nombre: nombre,
                    usuario: nusuario,
                    contrasena: genPassword,
                    userid: IdUsuario,
                  };
<<<<<<< Updated upstream
                 sendEmail(d);
=======

                  sendEmail(d);
                }

                if (result.length) {
                  const data = result[0][0];
                  if (data === undefined) {
                    return res.status(409).send({
                      error: "Verificar Id App",
                    });
                  }
>>>>>>> Stashed changes

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
