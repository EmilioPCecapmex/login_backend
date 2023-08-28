const db = require("../../config/db.js");

module.exports = {
  validEmailExist: (req, res) => {

    const Email = req.body.Email;
    if (Email == null || /^[\s]*$/.test(Email)) {
      return res.status(409).send({
        error: "Ingrese Email",
      });
    }
    let query=` SELECT 
	u.Id,
	u.NombreUsuario,
	u.Nombre,
	u.ApellidoPaterno,
	u.ApellidoMaterno,
	u.Puesto,
	u.Curp,
	u.Rfc,
	u.Telefono,
	u.Ext,
	u.Celular,
	u.IdTipoUsuario,
	u.PuedeFirmar
    FROM TiCentral.Usuarios u WHERE u.CorreoElectronico=?;`
    db.query(
        query,[Email] ,
      (err, result) => {
        if (err) {
          
          return res.status(500).send({
            error: "Error",
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
            result: {},
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
    let query=` SELECT 
	Count(*) AS Existe
    FROM TiCentral.Usuarios u WHERE u.NombreUsuario=?;`
    db.query(
        query,[UserName] ,
      (err, result) => {
        if (err) {
          
          return res.status(500).send({
            error: "Error",
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
