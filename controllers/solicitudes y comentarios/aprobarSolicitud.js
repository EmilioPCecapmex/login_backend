const db = require("../../config/db.js");

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

    db.query(
      `CALL sp_CambiaEstatusSolicitud('${IdUsuario}','${IdSolicitud}','${Estado}')`,
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
