const db = require("../../config/db.js");

module.exports = {
  deleteUser: (req, res) => {
    const userId = req.body.IdUsuario;
    db.query(`CALL sp_BajaUsuario('${userId}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0][0];
        if (data.error) {
          return res.status(409).send({
            result: data,
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
    });
  },
};
