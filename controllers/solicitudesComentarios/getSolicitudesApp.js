const db = require("../../config/db.js");

module.exports = {
//Listado general de solicitudes
  getSolicitudesApp: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    const IdApp= req.query.IdApp;
    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
          error: "Ingrese ID Usuario",
      });
  }
  if (IdApp == null || /^[\s]*$/.test(IdApp)) {
    return res.status(409).send({
        error: "Ingrese ID App",
    });
}
    db.query(`CALL sp_ListaSolicitudesApp('${IdUsuario}','${IdApp}')`, (err, result) => {
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
