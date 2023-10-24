const db = require("../../config/db.js");

module.exports = {
  //CREAR
  createRol: (req, res) => {
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const ControlInterno = req.body.ControlInterno;
    const CreadoPor = req.body.IdUsuario;
    const IdApp = req.body.IdApp;  

    if ((Descripcion == null || /^[\s]*$/.test(Descripcion)) ) {
      return res.status(409).send({
        error: "Ingrese Clave de inscripcion válida.",
      });
    } 
    if ((Nombre == null || /^[\s]*$/.test(Nombre)) ) {
        return res.status(409).send({
          error: "Ingrese Nombre válido.",
        });
      } 
      if ((ControlInterno == null || /^[\s]*$/.test(ControlInterno)) ) {
        return res.status(409).send({
          error: "Ingrese IdResponsable válido.",
        });
      }
      if ((CreadoPor == null || /^[\s]*$/.test(CreadoPor)) ) {
        return res.status(409).send({
          error: "Ingrese CreadoPor válido.",
        });
      }
      if ((IdApp == null || /^[\s]*$/.test(IdApp)) ) {
        return res.status(409).send({
          error: "Ingrese IdApp válido.",
        });
      }
    else {
      db.query(
        `CALL sp_CrearRol('${Nombre}','${Descripcion}', '${ControlInterno}',  '${IdApp}','${CreadoPor}' )`,
        (err, result) => {
          if (err) {
            return res.status(500).send({
              error: err.sqlMessage,
            });
          }
          if (result.length) {
            const data = result[0];

            
            const respo = data[0].Message;
            return res.status(200).send({
              data :respo,
            });
          } else {
            return res.status(409).send({
              error: "¡Sin Información!",
            });
          }
        }
      );
    }
  },

  //LISTADO COMPLETO
  getRoles: (req, res) => {
    const IdApp = req.query.IdApp;
    db.query(`CALL sp_ListaRoles('${IdApp}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: err.sqlMessage,
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

  

  //MODIFICA POR ID
  modifyRol: (req, res) => {
    const {Id, Nombre, Descripcion, ControlInterno, IdApp, IdUsuario }= req.body
    let query= `CALL sp_ModificaRol(?,?,?,?,?,?)`
      db.query(query,[Id,Nombre,Descripcion,ControlInterno,IdApp, IdUsuario],(err, result) => {
          if (err) {
            return res.status(500).send({
              error: err.sqlMessage,
            });
          }
          if (result.length) {
            const data = result[0][0];
            if (data.error) {
              return res.status(409).send({
                result: data,
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

  //Detalle

  //Borrado
  deleteRol: (req, res) => {
    const IdRol = req.body.Id;
    const IdUsuario = req.body.IdUsuario;
    db.query(
      `CALL sp_EliminarRoles('${IdRol}', '${IdUsuario}')`,
      (err, result) => {
        if (err) {
          if(err.sqlMessage){
            return res.status(500).send({
              error: err.sqlMessage,
            });
          }else{
            return res.status(500).send({
              error: 'error',
            });
          }
         
        }
        if (result.length) {
          const data = result[0][0];
          if (data.error) {
            return res.status(409).send({
              result: data,
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
  }
};

  
