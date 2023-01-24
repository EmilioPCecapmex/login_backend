const db = require("../../config/db.js");

module.exports = {
  modifySolicitud: (req, res) => {

    const IdSolicitud = req.body.IdSolicitud;
    const Nombre = req.body.Nombre;
    const APaterno = req.body.APaterno;
    const AMaterno = req.body.AMaterno;
    const Usuario = req.body.Usuario;
    const Email = req.body.Email;
    const CURP = req.body.CURP;
    const RFC = req.body.RFC;
    const Telefono = req.body.Telefono;
    const Extencion = req.body.Extencion;
    const Celular = req.body.Celular;
    const DatosAdicionales = req.body.DatosAdicionales;
    const Estatus = req.body.Estatus;
    const IdApp = req.body.IdApp;
    const IdUsuarioSolicitante = req.body.IdUsuarioSolicitante;

    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }
    if (Nombre == null || /^[\s]*$/.test(Nombre)) {
      return res.status(409).send({
        error: "Ingrese Nombre",
      });
    }
    if (APaterno == null || /^[\s]*$/.test(APaterno)) {
      return res.status(409).send({
        error: "Ingrese Apellido Paterno",
      });
    }
    if (AMaterno == null || /^[\s]*$/.test(AMaterno)) {
      return res.status(409).send({
        error: "Ingrese Apellido Materno",
      });
    }
    if (Usuario == null || /^[\s]*$/.test(Usuario)) {
      return res.status(409).send({
        error: "Ingrese Usuario",
      });
    }
    if (Email == null || /^[\s]*$/.test(Email)) {
      return res.status(409).send({
        error: "Ingrese Email",
      });
    }
    if (CURP == null || /^[\s]*$/.test(CURP)) {
      return res.status(409).send({
        error: "Ingrese CURP",
      });
    }
    if (RFC == null || /^[\s]*$/.test(RFC)) {
      return res.status(409).send({
        error: "Ingrese RFC",
      });
    }
    if (Telefono == null || /^[\s]*$/.test(Telefono)) {
      return res.status(409).send({
        error: "Ingrese Telefono",
      });
    }
    if (Extencion == null || /^[\s]*$/.test(Extencion)) {
      return res.status(409).send({
        error: "Ingrese Extencion",
      });
    }
    if (Celular == null || /^[\s]*$/.test(Celular)) {
      return res.status(409).send({
        error: "Ingrese Celular",
      });
    }
    if (IdApp == null || /^[\s]*$/.test(IdApp)) {
      return res.status(409).send({
        error: "Ingrese IdApp",
      });
    }
    if (Estatus == null || /^[\s]*$/.test(Estatus)) {
      return res.status(409).send({
        error: "Ingrese  Estatus",
      });
    }
    if (IdUsuarioSolicitante == null || /^[\s]*$/.test(IdUsuarioSolicitante)) {
      return res.status(409).send({
        error: "Ingrese Id Usuario Solicitante",
      });
    }


    db.query(
      `CALL sp_ModificaSolicitud('${IdSolicitud}','${Nombre}','${APaterno}','${AMaterno}','${Usuario}','${Email}','${CURP}','${RFC}','${Telefono}','${Extencion}','${Celular}','${DatosAdicionales}','${Estatus}','${IdApp}','${IdUsuarioSolicitante}')`,
      (err, result) => {
        if (err) {
          
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result.length) {
          
          const data = result[0][0];
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
            error: "¡Sin Información!",
          });
        }
      }
    );
  },
};
