const db = require("../../config/db.js");

module.exports = {
  //Listado general de solicitudes
  getSolicitudes: (req, res) => {
    const IdUsuario = req.query.IdUsuario;

    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese Id Usuario",
      });
    }
    db.query(`CALL sp_ListaSolicitudes('${IdUsuario}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0]
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

  //detalle de solicitud
  getDetalleSolicitud: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    const IdSolicitud = req.query.IdSolicitud;
    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese Id Solicitud",
      });
    }
    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese Id Usuario",
      });
    }

    db.query(`CALL sp_DetalleSolicitud('${IdUsuario}','${IdSolicitud}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0]
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



  getDatosAdicionalesSolicitud: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    const IdApp = req.query.IdApp;
   
    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese Id Usuario",
      });
    }

    if (IdApp == null || /^[\s]*$/.test(IdApp)) {
      return res.status(409).send({
        error: "Ingrese Id App",
      });
    }
   

    db.query(`CALL sp_ObtenerDatosAdicionalesSolicitud('${IdUsuario}','${IdApp}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0]
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
  }
};



