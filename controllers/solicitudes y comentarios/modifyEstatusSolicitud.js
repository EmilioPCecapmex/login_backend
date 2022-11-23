const db = require("../../config/db.js");

module.exports = {
  modifyEstatusSolicitud: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const IdSolicitud = req.body.IdSolicitud;
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
    if (Estatus == null || /^[\s]*$/.test(Estatus)) {
        return res.status(409).send({
            error: "Ingrese Nuevo Estatus",
        });
    }

    db.query(
      `CALL sp_AprobarSolicitud('${IdUsuario}','${IdSolicitud}','${Estatus}')`,
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
