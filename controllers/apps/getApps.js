const db = require("../../config/db.js");

module.exports = {
  getAppDetail: (req, res) => {
    const AppId = req.body.IdApp;
    db.query(`CALL sp_DetalleApp('${AppId}')`, (err, result) => {
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
  getAppsInfo: (req, res) => {
    db.query(`CALL sp_ListaApp()`, (err, result) => {
      if (err) {
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
  getUserApps: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    db.query(`CALL sp_ListaAppUsuario('${IdUsuario}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const msg = result[0][0].Msg;
        const data = result[0];


    
        if (msg) {
          return res.status(409).send({
            Msg: msg,
          });
        }

        if (data === undefined) {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }else{
          return res.status(200).send({
            data,
          });
        }
     
      } else {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    });
  },
};
