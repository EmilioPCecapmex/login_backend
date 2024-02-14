const db = require("../../config/db.js");

module.exports = {
  validEmailExist: (req, res) => {

    const Email = req.body.Email;
    if (Email == null || /^[\s]*$/.test(Email)) {
      return res.status(409).send({
        error: "Ingrese Email",
      });
    }
    db.query(`CALL sp_ValidarEmail('${Email}')` ,(err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error: "+err.sqlMessage,
          });
        }
        if (result.length) {
          const data = result[0];
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
            result: [],
          });
        }
      }
    );
  },



  validUserNameExist: (req, res) => {

    const UserName = req.body.UserName;
    if (UserName == null || /^[\s]*$/.test(UserName)) {
      return res.status(409).send({
        error: "Ingrese UserName",
      });
    }
    db.query(`CALL sp_ValidarUserName('${UserName}')` ,(err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error: "+err.sqlMessage,
          });
        }
        if (result.length) {
          const data = result[0];
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
