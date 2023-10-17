const db = require("../../config/db.js");

module.exports = {
  modifyApp: (req, res) => {
    const appId = req.body.IdApp;
    const name = req.body.Nombre;
    const des = req.body.Descripcion;
    const path = req.body.Path;
    const userUpdateId = req.body.IdUsuarioModificador;
    const estaActivo = req.body.EstaActivo;
    // const query = 'UPDATE `Apps` '+
    // 'SET `Nombre` = ?, `Descripcion` = ? , `Path` = ? , `EstaActivo` = ? , `ModificadoPor` = ? ' +
    // 'WHERE `id` = ?';
    // const values = [name, des, path,estaActivo,userUpdateId,appId];
    const query=`CALL sp_ModificaApp(?,?,?,?,?,?)`
    const values = [appId,name,path,userUpdateId,des,estaActivo];

    console.log("values",values);
    db.query(query, values, (err, result) => {
      console.log("err",err);
      console.log("result",result[0][0].Mensaje);
          if (err) {
              return res.status(500).send({
                error: err,
              });
            }
            if (result[0][0].Mensaje==="Ok") {
              data=result[0][0]
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
