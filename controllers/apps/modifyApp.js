const db = require("../../config/db.js");

module.exports = {
  modifyApp: (req, res) => {
    const appId = req.body.IdApp;
    const name = req.body.Nombre;
    const des = req.body.Descripcion;
    const path = req.body.Path;
    const userUpdateId = req.body.IdUsuarioModificador;
    const estaActivo = req.body.EstaActivo;
    const query = 'UPDATE `Apps` '+
    'SET `Nombre` = ?, `Descripcion` = ? , `Path` = ? , `EstaActivo` = ? , `ModificadoPor` = ? ' +
    'WHERE `id` = ?';
    const values = [name, des, path,estaActivo,userUpdateId,appId];

    db.query(query, values, (err, result) => {
          if (err) {
              return res.status(500).send({
                error: "Error",
              });
            }
            if (result.affectedRows!=0) {
              const data = result.affectedRows;
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
      }
    ); 
    
  },
};
