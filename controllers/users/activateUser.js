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
      const d = result[0][0];


      if (result[0][0].Result) {
        return res.status(200).send({
          IdUsuario: d.UserId,
          result: d.Result,
        });
      } else {
        return res.status(409).send({warning: d});
      }
    });
  },
};
