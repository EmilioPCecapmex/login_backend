const db = require("../../config/db.js");

module.exports = {
  createApp: (req, res) => {
    const {Nombre,Path,Descripcion,IdUsuarioModificador} = req.body;
  

    let query=`CALL sp_ExisteApp(?,?,?)`;
    db.query(query,[Nombre,Path,IdUsuarioModificador],(err, result) => {
       
        if (err != null ) {
          return res.status(500).send({
            error: err ,
          });
        }
        const ExisteNombre = result[0][0].ExisteNombre;
        const ExistePath = result[0][0].ExistePath;

        if (ExisteNombre || ExistePath) {
          if (ExisteNombre > 0) {
            return res.status(409).send({
              msg: "Nombre actualmente en uso. Verifique la base de datos",
            });
          } else if (ExistePath > 0) {
            return res.status(409).send({
              msg: "Ruta actualmente en uso. Verifique la base de datos",
            });
          }
        } else {
          // username is available
          let query2=`CALL sp_CrearApp (?,?,?,?)`
          db.query(query2,[Nombre,Descripcion,Path,IdUsuarioModificador],(err, result) => {
              
              if (err) {
                return res.status(500).send({
                  error: err ,
                });
              }

              return res.status(201).send({
                msg: "¡Registro exitoso!",
              });
            }
          );
        }
      }
    );
  },
};
