const db = require("../../config/db.js");

module.exports = {
    //LISTADO COMPLETO
    getHistorico: (req, res) => {
        const {IdRegistro}=req.query;

        const {
            IdMenu,
            Pregunta,
            Texto,
            RutaGuia,
            RutaVideo,
            NombreArchivo,
            NombreArchivoServidor,
            IdUsuario,
          } = req.body;
          let contError = 0;
          let error = "Ingrese:";
      
          if (!IdRegistro || /^[\s]*$/.test(IdRegistro)) {
            error += " IdRegistro,";
            contError++;
          }

          // Elimina la última coma si existe
          error = error.endsWith(",") ? error.slice(0, -1) : error;
          //Remplaza la ultima coma por un " y "
          error = error.replace(/,([^,]*)$/, " y$1");
      
          if (contError != 0) {
            return res.status(400).send({
              error: error,
            });
          }

        db.query(`CALL sp_ObtenerTrazabilidad(?)`, [IdRegistro], (err, result) => {
            console.log('err',err);
            console.log('result',result[0]);

            if (err) {
                return res.status(500).send({
                error: "Error: "+err.sqlMessage,
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