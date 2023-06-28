const db = require("../../config/db.js");

module.exports = {
  //CREAR
  createDepartamento: (req, res) => {
   
    const Descripcion = req.body.Descripcion;
    const NombreCorto = req.body.NombreCorto;
    const IdResponsable = req.body.IdResponsable;
    const CreadoPor = req.body.CreadoPor;   

    if ((Descripcion == null || /^[\s]*$/.test(Descripcion)) ) {
      return res.status(409).send({
        error: "Ingrese Clave de inscripcion válida.",
      });
    } 
    if ((NombreCorto == null || /^[\s]*$/.test(NombreCorto)) ) {
        return res.status(409).send({
          error: "Ingrese NombreCorto válido.",
        });
      } 
      if ((IdResponsable == null || /^[\s]*$/.test(IdResponsable)) ) {
        return res.status(409).send({
          error: "Ingrese IdResponsable válido.",
        });
      }
      if ((CreadoPor == null || /^[\s]*$/.test(CreadoPor)) ) {
        return res.status(409).send({
          error: "Ingrese CreadoPor válido.",
        });
      }
    else {
      db.query(
        `CALL sp_CrearDepartamento('${Descripcion}','${NombreCorto}', '${IdResponsable}', '${CreadoPor}' )`,
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
    }
  },

  //LISTADO COMPLETO
  getDepartamentos: (req, res) => {
    db.query(`CALL sp_ListaDepartamentos()`, (err, result) => {
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
  modifyDepartamento: (req, res) => {
    const IdDepartamento = req.body.Id;
    const Descripcion = req.body.Descripcion;
    const NombreCorto = req.body.NombreCorto;
    const IdResponsable = req.body.IdResponsable;
    const IdModificador = req.body.IdModificador;
  

    if (IdDepartamento == null ||/^[\s]*$/.test(IdDepartamento)) {
      return res.status(409).send({
        error: "Ingrese IdDepartamento",
      });
    }

    if (Descripcion == null ||/^[\s]*$/.test(Descripcion)) {
      return res.status(409).send({
        error: "Ingrese Descripcion",
      });
    }
    
    if (NombreCorto == null ||/^[\s]*$/.test(NombreCorto)) {
        return res.status(409).send({
          error: "Ingrese NombreCorto",
        });
      }

      if (IdResponsable == null ||/^[\s]*$/.test(IdResponsable)) {
        return res.status(409).send({
          error: "Ingrese IdResponsable",
        });
      }
    if (IdModificador == null ||/^[\s]*$/.test(IdModificador)) {
        return res.status(409).send({
          error: "Ingrese IdModificador",
        });
      } else {
      db.query(
        `CALL sp_ModificaDepartamento('${IdDepartamento}','${Descripcion}','${NombreCorto}','${IdResponsable}','${IdModificador}')`,
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
    }
  },
/////Detalle//////


////////////////////
  // BORRADO LOGICO

  deleteDepartamento: (req, res) => {
    const IdDepartamento = req.body.Id;
    const IdUsuario = req.body.IdUsuario;
    
    db.query(
      `CALL sp_EliminarDepartamento('${IdDepartamento}', '${IdUsuario}')`,
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


// // DETALLE POR ID
 getDetailDepartamentos: (req, res) => {
     const IdDepartamento = req.body.IdDepartamento;
     const IdUsuario = req.body.IdUsuario;
     if (IdDepartamento == null ||/^[\s]*$/.test(IdDepartamento) && IdUsuario == null ||/^[\s]*$/.test(IdUsuario)) {
         return res.status(409).send({
           error: "Ingrese IdDescripcion, o departamento",
         });
       } 

     db.query(
       `CALL sp_DetalleDepartamento('${IdDepartamento}', '${IdUsuario}')`,
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
