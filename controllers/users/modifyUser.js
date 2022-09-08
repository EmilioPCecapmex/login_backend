const db = require("../../config/db.js");

module.exports = {
  modifyUser: (req, res) => {
    const userId = req.body.IdUsuario;
    const name = req.body.Nombre;
    const nameAP = req.body.ApellidoPaterno;
    const nameAM = req.body.ApellidoMaterno;
    const estaActivo = req.body.EstaActivo;
    const userUpdateId = req.body.IdUsuarioModificador;

    db.query(
      `CALL sp_ModificaUsuario('${userId}','${name}','${nameAP}','${nameAM}',${estaActivo},'${userUpdateId}')`,
      (err, result) => {
        if (err) {
          console.log(err)
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result[0][0] === undefined) {
          return res.status(409).send({
            error: "Verificar Id Usuario",
          });
        }
        if (result.length) {
          const data = result[0][0];
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
