const db = require("../../config/db.js");

module.exports = {
  getUserDetail: (req, res) => {
    const userId = req.body.IdUsuario;
    db.query(`CALL sp_DetalleUsuario('${userId}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0][0];
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
  
  getUsersInfo: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    db.query(`CALL sp_ListaUsuarios('${IdUsuario}')`, (err, result) => {
      if (err) {
        console.log(err)

        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0];
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
