const db = require("../../config/db.js");

module.exports = {
  linkUserApp: (req, res) => {
    const appData = req.body;
    db.query(
      `CALL sp_VinculaUsuarioApp('${appData.IdUsuario}','${appData.IdApp}')`,
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
            warning: error,
          });
        }
      }
    );
  },
  unlinkUserApp: (req, res) => {
    const appData = req.body;
    db.query(
      `CALL sp_DesvinculaUsuarioApp('${appData.IdUsuario}','${appData.IdApp}')`,
      (err, result) => {

        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        
        const warning = result[0][0].warning;

        if (warning === undefined) {
          return res.status(201).send({
            msg: "¡Registro eliminado con exito!",
          });
        } else {
          return res.status(409).send({
            warning,
          });
        }
      }
    );
  },
};
