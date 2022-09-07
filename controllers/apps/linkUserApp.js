const db = require("../../config/db.js");

module.exports = {
  linkUserApp: (req, res) => {
    const appData = req.body;
    db.query(
      `CALL sp_VinculaUsuarioApp(${db.escape(appData.IdUsuario)},${db.escape(
        appData.IdApp
      )})`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        const error = result[0][0].message;

        if (error === undefined) {
          return res.status(201).send({
            msg: "¡Registro exitoso!",
          });
        } else {
          return res.status(409).send({
            error,
          });
        }
      }
    );
  },
};
