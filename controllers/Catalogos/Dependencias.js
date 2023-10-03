const db = require("../../config/db.js");

module.exports = {
  //CREAR
  getEntidadPadre: (req, res) => {
    let query = ` (SELECT "Secretarias" AS tipo, id AS value, Nombre AS descripcion FROM TiCentral.Secretarias sec where sec.Deleted=0) 
    UNION ALL 
    (SELECT "Dependencias" AS tipo, id AS value, Nombre AS descripcion FROM TiCentral.Dependencias dep where dep.Deleted=0) ORDER BY tipo DESC, descripcion ASC`
    db.query(query,
      (err, result) => {
        if (err) {
          if (err.sqlMessage) {
            return res.status(500).send({
              error: err.sqlMessage,
            });
          } else {
            return res.status(500).send({
              error: "Error",
            });
          }

        }

        if (result.length) {

          const data = result;
          if (data.error) {
            return res.status(409).send({
              data: data,
            });
          }
          return res.status(200).send({
            data: data,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }

    )

  },

  

};