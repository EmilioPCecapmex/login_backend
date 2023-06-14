const db = require("../../config/db.js");

module.exports = {
  //CREAR
  createPerfil: (req, res) => {
   
    const Descripcion = req.body.Descripcion;
    const Referencia = req.body.Referencia;  
    const CreadoPor = req.body.CreadoPor;  


      if ((Descripcion == null || /^[\s]*$/.test(Descripcion)) ) {
        return res.status(409).send({
          error: "Ingrese Descripcion válido.",
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
   
      db.query(
        `CALL sp_CrearPerfil('${Descripcion}','${Referencia}', '${CreadoPor}')`,
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
    const IdUsuario = req.query.IdUsuario;
    db.query(`CALL sp_ListaPerfiles('${IdUsuario}')`, (err, result) => {
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
  modifyPerfil: (req, res) => {
    const IdPerfil = req.body.IdPerfil;
    const Descripcion = req.body.Descripcion;
    const Referencia = req.body.Referencia; 
    const IdModificador = req.body.IdModificador;  

    if ((IdPerfil == null || /^[\s]*$/.test(IdPerfil)) ) {
        return res.status(409).send({
          error: "Ingrese IdPerfil valido.",
        });
      } 

      if ((Descripcion == null || /^[\s]*$/.test(Descripcion)) ) {
        return res.status(409).send({
          error: "Ingrese Descripcion válido.",
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
  deletePerfil: (req, res) => {
    const IdPerfil = req.body.IdPerfil;
    const IdUsuario = req.body.IdUsuario;
    db.query(
      `CALL sp_EliminarPerfil('${IdPerfil}', '${IdUsuario}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
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

  
};