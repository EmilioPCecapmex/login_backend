const db = require("../../config/db.js");

module.exports = {
  modifySolicitud: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const IdSolicitud = req.body.IdSolicitud;
    const IdApp = req.body.IdApp;
    const DatosAdicionales = req.body.DatosAdicionales;
    const Estatus = req.body.Estatus;

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
    if (IdApp == null || /^[\s]*$/.test(IdApp)) {
        return res.status(409).send({
            error: "Ingrese ID App",
        });
    }
    if (DatosAdicionales == null || /^[\s]*$/.test(DatosAdicionales)) {
        return res.status(409).send({
            error: "Ingrese Datos Adicionales",
        });
    }
    if (Estatus == null || /^[\s]*$/.test(Estatus)) {
        return res.status(409).send({
            error: "Ingrese Nuevo Estatus",
        });
    }

    db.query(
      `CALL sp_ModificaSolicitud('${IdUsuario}','${IdSolicitud}','${IdApp}','${DatosAdicionales}','${Estatus}')`,
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
  },
};
