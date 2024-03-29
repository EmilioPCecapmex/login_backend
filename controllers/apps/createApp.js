const db = require("../../config/db.js");

module.exports = {
  createApp: (req, res) => {
    const appData = req.body;
    db.query(
      `CALL sp_ExisteApp(${db.escape(appData.Nombre)},${db.escape(
        appData.Path
      )},${db.escape(appData.IdUsuarioModificador)})`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        const ExisteNombre = result[0][0].ExisteNombre;
        const ExistePath = result[0][0].ExistePath;

        if (ExisteNombre || ExistePath) {
          if (ExisteNombre > 0) {
            return res.status(409).send({
              msg: "Nombre actualmente en uso.",
            });
          } else if (ExistePath > 0) {
            return res.status(409).send({
              msg: "Path actualmente en uso.",
            });
          }
        } else {
          // username is available
          db.query(
            `CALL sp_CreaApp (
                  ${db.escape(appData.Nombre)},
                  ${db.escape(appData.Path)},
                 ${db.escape(appData.IdUsuarioModificador)}
                 )`,

            (err, result) => {
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
