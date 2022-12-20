const db = require("../../config/db.js");

module.exports = {
//Listado tipo de solicitudes
  getTipoSolicitud: (req, res) => {
    const IdUsuario = req.query.IdUsuario;

    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
        return res.status(409).send({
            error: "Ingrese ID Usuario",
        });
    }
    db.query(`CALL sp_ListaTipoSolicitud('${IdUsuario}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0]
        if (data === undefined) {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
        return res.status(200).send({
          data,
        });
      } else {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    });
  },

 
};
