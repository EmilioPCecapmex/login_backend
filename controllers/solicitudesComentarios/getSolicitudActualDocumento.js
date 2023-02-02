const db = require("../../config/db.js");

module.exports = {
//Listado general de solicitudes
getSolicitudActualDocumento: (req, res) => {
    const IdSolicitud = req.query.IdSolicitud;
    
    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
          error: "Ingrese IdSolicitud",
      });
  }

    db.query(`CALL sp_SolicitudActualDocumento('${IdSolicitud}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        return res.status(200).send({
         result,
        });
        
      } else {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    });
  },
 
};
