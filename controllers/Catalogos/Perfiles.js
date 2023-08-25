const db = require("../../config/db.js");

module.exports = {
  //CREAR
  createPerfil: (req, res) => {
   
    const Descripcion = req.body.Descripcion;
    const Referencia = req.body.Referencia;  
    const CreadoPor = req.body.IdUsuario; 
    const IdApp=req.body.IdApp;


      if ((Descripcion == null || /^[\s]*$/.test(Descripcion)) ) {
        return res.status(409).send({
          error: "Ingrese Descripción válida.",
        });
      }
      if ((Referencia == null || /^[\s]*$/.test(Referencia)) ) {
        return res.status(409).send({
          error: "Ingrese Referencia válido.",
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
   
      db.query(
        `CALL sp_CrearPerfil('${Descripcion}','${Referencia}', '${CreadoPor}', '${IdApp}')`,
        (err, result) => {
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

  //LISTADO COMPLETO
  getPerfiles: (req, res) => {
    const IdApp = req.query.IdApp
    db.query(`SELECT per.Id,per.Descripcion,per.Referencia FROM TiCentral.Perfiles per WHERE per.IdApp=? and per.Deleted=0;`,[IdApp], (err, result) => {
      if (err) {
        return res.status(500).send({
          error: err.sqlMessage,
        });
      }

      if (result.length) {
        const data = result;
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
  modifyPerfil: (req, res) => {
    const IdPerfil = req.body.Id;
    const Descripcion = req.body.Descripcion;
    const Referencia = req.body.Referencia; 
    const IdModificador = req.body.IdUsuario;  

    if ((IdPerfil == null || /^[\s]*$/.test(IdPerfil)) ) {
        return res.status(409).send({
          error: "Ingrese IdPerfil válido.",
        });
      } 

      if ((Descripcion == null || /^[\s]*$/.test(Descripcion)) ) {
        return res.status(409).send({
          error: "Ingrese Descripción válida.",
        });
      }
      if ((Referencia == null || /^[\s]*$/.test(Referencia)) ) {
        return res.status(409).send({
          error: "Ingrese Referencia válido.",
        });
      }
      if ((IdModificador == null || /^[\s]*$/.test(IdModificador)) ) {
        return res.status(409).send({
          error: "Ingrese IdModificador válido.",
        });
      }
      db.query(
        `CALL sp_ModificaPerfil('${IdPerfil}','${Descripcion}','${Referencia}','${IdModificador}')`,
        (err, result) => {
          if (err) {
            return res.status(500).send({
              error: "Error al modificar registro, registro ya existente",
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
  deletePerfil: (req, res) => {
    const IdPerfil = req.body.Id;
    const IdUsuario = req.body.IdUsuario;
    db.query(
      `CALL sp_EliminarPerfil('${IdPerfil}', '${IdUsuario}')`,
      (err, result) => {
        if (err) {
          if(err.sqlMessage){
            return res.status(500).send({
              error: err.sqlMessage,
            });
          }else{
            return res.status(500).send({
              error: "Error",
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
  }, 

  
};