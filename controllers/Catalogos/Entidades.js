const db = require("../../config/db.js");

module.exports = {
  //CREAR
  getSecretariaByEntidad: (req, res) => {
  
    const { IdEntidad, TipoEntidad } = req.query;
        
    let contError=0;
    let error = "Ingrese:";
        if (!IdEntidad || (/^[\s]*$/.test(IdEntidad)))
        {
            error += " IdEntidad,";
            contError++;
        } 
        if (!TipoEntidad || (/^[\s]*$/.test(TipoEntidad)))
        {
            error += " TipoEntidad,";
            contError++;
        } 
       
        // Elimina la última coma si existe
        error = error.endsWith(',') ? error.slice(0, -1) : error;
        //Remplaza la ultima coma por un " y "
        error = error.replace(/,([^,]*)$/, ' y$1');

    if (contError!=0) {
        return res.status(400).send({
            error: error,
        });
    }
      db.query(
        `CALL sp_ObtenerSecretariaPorNEntidad(?,?)`,[IdEntidad, TipoEntidad],
        (err, result) => {
          if (err) {
            return res.status(500).send({
              error: err.sqlMessage,
            });
          }
          if (result.length) {
            const data = result[0];

            return res.status(200).send({
              data 
            });
          } else {
            return res.status(409).send({
              error: "¡Sin Información!",
            });
          }
        }
      );
    
  },

  getInfoEntidad: (req, res) => {
  
    const { IdEntidad } = req.query;
        
    let contError=0;
    let error = "Ingrese:";
        if (!IdEntidad || (/^[\s]*$/.test(IdEntidad)))
        {
            error += " IdEntidad,";
            contError++;
        } 
       
       
        // Elimina la última coma si existe
        error = error.endsWith(',') ? error.slice(0, -1) : error;
        //Remplaza la ultima coma por un " y "
        error = error.replace(/,([^,]*)$/, ' y$1');

    if (contError!=0) {
        return res.status(400).send({
            error: error,
        });
    }
      db.query(
        `CALL sp_ObtenerInfoEntidad(?)`,[IdEntidad],
        (err, result) => {
          if (err) {
            return res.status(500).send({
              error: err.sqlMessage,
            });
          }
          if (result.length) {
            const data = result[0];

            return res.status(200).send({
              data 
            });
          } else {
            return res.status(409).send({
              error: "¡Sin Información!",
            });
          }
        }
      );
    
  },

}