const db = require("../../config/db.js");

module.exports = {
  getUsersTypes: (req, res) => {
    const IdApp = req.body.IdApp;
    db.query(`CALL sp_ListaTipoUsuario('${IdApp}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }

      if (result.length) {
        const data = result[0];
        if (data === undefined) {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
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
