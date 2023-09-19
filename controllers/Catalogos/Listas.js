const db = require("../../config/db.js");
module.exports = {
  //LISTADO COMPLETO
    getListas: (req, res) => {
    const {Tabla,ValorCondicion}=req.query
    db.query(`CALL sp_ListadoPorCatalogo(?,?)`,[Tabla,ValorCondicion], (err, result) => {
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }

      if (result.length) {
        const data = result[0];
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
