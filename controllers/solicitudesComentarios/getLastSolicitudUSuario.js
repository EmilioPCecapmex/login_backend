const db = require("../../config/db.js");

module.exports = {
//Listado general de solicitudes
  getSolicitudUsuario: (req, res) => {
    const NombreUsuario = req.query.NombreUsuario;
    
    if (NombreUsuario == null || /^[\s]*$/.test(NombreUsuario)) {
      return res.status(409).send({
          error: "Ingrese NombreUsuario",
      });
  }

    db.query(`CALL sp_UltimaSolicitudUsuario('${NombreUsuario}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        console.log("daots:",result[0][0]);
        
      } else {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    });
  },
 
};
