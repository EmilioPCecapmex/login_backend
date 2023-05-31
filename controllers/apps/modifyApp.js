const db = require("../../config/db.js");

module.exports = {
  modifyApp: (req, res) => {
    const appId = req.body.IdApp;
    const name = req.body.Nombre;
    const des = req.body.Descripcion;
    const path = req.body.Path;
    const userUpdateId = req.body.IdUsuarioModificador;
    db.query(
      `CALL sp_ModificaApp('${appId}','${name}','${path}','${userUpdateId}','${des}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result.length) {
          const data = result[0][0];
          if (data === undefined) {
            return res.status(409).send({
              error: "Verificar Id App",
            });
          }

          return res.status(200).send({
            result: data,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },
};
