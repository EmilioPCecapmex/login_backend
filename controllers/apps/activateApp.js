const db = require("../../config/db.js");

module.exports = {
  activateApp: (req, res) => {
    const appId = req.body.IdApp;
    db.query(`CALL sp_ActivarApp('${appId}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      const d = result[0][0];

      if (result[0][0].Result) {
        return res.status(200).send({
          appId: d.appId,
          result: d.Result,
        });
      } else {
        return res.status(409).send({warning: d});
      }
    });
  },
};
