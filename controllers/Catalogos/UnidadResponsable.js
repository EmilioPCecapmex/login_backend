const db = require("../../config/db.js");

module.exports = {
  //CREAR
  createUResponsable: (req, res) => {
    const Clave = req.body.Clave;
    const Descripcion = req.body.Descripcion;
    const CreadoPor = req.body.CreadoPor;   

    

    if ((Clave == null || /^[\s]*$/.test(Clave)) ) {
        return res.status(409).send({
          error: "Ingrese Clave válida.",
        });
    }

    if ((Descripcion == null || /^[\s]*$/.test(Descripcion)) ) {
        return res.status(409).send({
          error: "Ingrese Descripcion válida.",
        });
    }

    if ((CreadoPor == null || /^[\s]*$/.test(CreadoPor)) ) {
        return res.status(409).send({
          error: "Ingrese CreadoPor válido.",
        });
    }
   
      db.query(
        `CALL sp_CrearUResponsable('${Clave}', '${Descripcion}', '${CreadoPor}' )`,
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
  getUResponsables: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    console.log(req);
    db.query(`CALL sp_ListaUResponsables('${IdUsuario}')`, (err, result) => {
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
  modifyUResponsable: (req, res) => {
    const IdUResponsable = req.body.IdUResponsable;
   
    const Clave = req.body.Clave;
    const Descripcion = req.body.Descripcion;
    const IdModificador = req.body.IdModificador;   

    if ((IdUResponsable == null || /^[\s]*$/.test(IdUResponsable)) ) {
        return res.status(409).send({
          error: "Ingrese IdUResponsable válido.",
        });
      } 

    if ((Clave == null || /^[\s]*$/.test(Clave)) ) {
        return res.status(409).send({
          error: "Ingrese Clave válido.",
        });
    }

    if ((Descripcion == null || /^[\s]*$/.test(Descripcion)) ) {
        return res.status(409).send({
          error: "Ingrese Descripcion válido.",
        });
    }

    if ((IdModificador == null || /^[\s]*$/.test(IdModificador)) ) {
        return res.status(409).send({
          error: "Ingrese IdModificador válido.",
        });
    }

      db.query(
        `CALL sp_ModificaUResponsable('${IdUResponsable}','${Clave}','${Descripcion}','${IdModificador}')`,
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
  deleteUResponsable: (req, res) => {
    const IdUnidadR = req.body.IdUnidadR;
    const IdUsuario = req.body.IdUsuario;
    db.query(
      `CALL sp_EliminarUnidadesResponsables('${IdUnidadR}', '${IdUsuario}')`,
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
  }

  
};