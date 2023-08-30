const db = require("../../config/db.js");

module.exports = {
  createApp: (req, res) => {
    const appData = req.body;
    db.query(
      `CALL sp_ExisteApp(${db.escape(appData.Nombre)},${db.escape(
        appData.Path
      )},${db.escape(appData.IdUsuarioModificador)})`,
      (err, result) => {
       
        if (err != null ) {
          return res.status(500).send({
            error: "Error",
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
          
          db.query(
            `CALL sp_CrearApp (
                  ${db.escape(appData.Nombre)},
                  '',
                  ${db.escape(appData.Path)},
                  ${db.escape(appData.IdUsuarioModificador)}
                 )`,

            (err, result) => {
               console.log(err);
              if (err) {
                return res.status(500).send({
                  error: "Error",
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
