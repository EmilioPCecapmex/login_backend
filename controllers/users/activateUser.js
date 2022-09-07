const db = require("../../config/db.js");

module.exports = {
  activateUser: (req, res) => {
    const userId = req.query.userId;
    db.query(`CALL sp_ActivarUsuario('${userId}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const d = result[0][0];
        return res.status(409).send({
          msg: "Activación Exitosa",
          userId: d.UserId,
          result: d.Result,
        });
      } else {
      }
    });
  },
};
