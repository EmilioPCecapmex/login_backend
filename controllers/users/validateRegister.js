const jwt = require("jsonwebtoken");

module.exports = {
  validateRegister: (req, res, next) => {
    // nombre de usuario mayor a 3 caracteres
    if (!req.body.NombreUsuario || req.body.NombreUsuario.length < 3) {
      return res.status(409).send({
        msg: "Ingresa un nombre de usuario mayor a 3 carácteres.",
      });
    }
    //comprobar primer nombre
    if (!req.body.Nombre) {
      return res.status(409).send({
        msg: "Ingresa nombre del usuario.",
      });
    }

    if (!req.body.ApellidoPaterno) {
      return res.status(409).send({
        msg: "Ingresa apellido paterno del usuario.",
      });
    }

    if (!req.body.ApellidoMaterno) {
      return res.status(409).send({
        msg: "Ingresa apellido materno del usuario.",
      });
    }
    //comprobar correo electronico
    if (!req.body.CorreoElectronico) {
      return res.status(409).send({
        msg: "Ingresa correo electronico del usuario.",
      });
    }

    next();
  },
};
