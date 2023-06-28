const db = require("../../config/db.js");

module.exports = {
  //CREAR
  createDependencia: (req, res) => {
   
    const Nombre = req.body.Nombre;
    const Direccion = req.body.Direccion;
    const Telefono = req.body.Telefono;
    const IdTipoDependencia = req.body.IdTipoDependencia;   
    const IdTitular = req.body.IdTitular;  
    const PerteneceA = req.body.PerteneceA;  
    const CreadoPor = req.body.CreadoPor;  

    if ((Nombre == null || /^[\s]*$/.test(Nombre)) ) {
      return res.status(409).send({
        error: "Ingrese Nombre valido.",
      });
    } 
    if ((Direccion == null || /^[\s]*$/.test(Direccion)) ) {
        return res.status(409).send({
          error: "Ingrese Direccion válida.",
        });
      } 
      if ((Telefono == null || /^[\s]*$/.test(Telefono)) ) {
        return res.status(409).send({
          error: "Ingrese Telefono válido.",
        });
      }
      if ((IdTipoDependencia == null || /^[\s]*$/.test(IdTipoDependencia)) ) {
        return res.status(409).send({
          error: "Ingrese IdTipoDependencia válido.",
        });
      }
      if ((IdTitular == null || /^[\s]*$/.test(IdTitular)) ) {
        return res.status(409).send({
          error: "Ingrese IdTitular válido.",
        });
      }
      if ((PerteneceA == null || /^[\s]*$/.test(PerteneceA)) ) {
        return res.status(409).send({
          error: "Ingrese PerteneceA válido.",
        });
      }
      if ((CreadoPor == null || /^[\s]*$/.test(CreadoPor)) ) {
        return res.status(409).send({
          error: "Ingrese CreadoPor válido.",
        });
      }
   
      db.query(
        `CALL sp_CrearDependencia('${Nombre}','${Direccion}', '${Telefono}', '${IdTipoDependencia}','${IdTitular}','${PerteneceA}','${CreadoPor}' )`,
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
  getDependencias: (req, res) => {
    db.query(`CALL sp_ListaDependencias()`, (err, result) => {
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
  modifyDependencia: (req, res) => {
    const IdDependencia = req.body.Id;
    const Nombre = req.body.Nombre;
    const Direccion = req.body.Direccion;
    const Telefono = req.body.Telefono;
    const IdTipoDependencia = req.body.IdTipoDependencia;   
    const IdTitular = req.body.IdTitular;  
    const PerteneceA = req.body.PerteneceA;  
    const IdModificador = req.body.IdModificador;  

    if ((IdDependencia == null || /^[\s]*$/.test(IdDependencia)) ) {
        return res.status(409).send({
          error: "Ingrese IdDependencia valido.",
        });
      } 

    if ((Nombre == null || /^[\s]*$/.test(Nombre)) ) {
      return res.status(409).send({
        error: "Ingrese Nombre valido.",
      });
    } 
    if ((Direccion == null || /^[\s]*$/.test(Direccion)) ) {
        return res.status(409).send({
          error: "Ingrese Direccion válida.",
        });
      } 
      if ((Telefono == null || /^[\s]*$/.test(Telefono)) ) {
        return res.status(409).send({
          error: "Ingrese Telefono válido.",
        });
      }
      if ((IdTipoDependencia == null || /^[\s]*$/.test(IdTipoDependencia)) ) {
        return res.status(409).send({
          error: "Ingrese IdTipoDependencia válido.",
        });
      }
      if ((IdTitular == null || /^[\s]*$/.test(IdTitular)) ) {
        return res.status(409).send({
          error: "Ingrese IdTitular válido.",
        });
      }
      if ((PerteneceA == null || /^[\s]*$/.test(PerteneceA)) ) {
        return res.status(409).send({
          error: "Ingrese PerteneceA válido.",
        });
      }
      if ((IdModificador == null || /^[\s]*$/.test(IdModificador)) ) {
        return res.status(409).send({
          error: "Ingrese IdModificador válido.",
        });
      }
      db.query(
        `CALL sp_ModificaDependencia('${IdDependencia}','${Nombre}','${Direccion}', '${Telefono}', '${IdTipoDependencia}','${IdTitular}','${PerteneceA}','${IdModificador}')`,
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
  deleteDependencia: (req, res) => {
    const IdDependencia = req.body.IdDependencia;
    const IdUsuario = req.body.IdUsuario;
    db.query(
      `CALL sp_EliminarDependencia('${IdDependencia}', '${IdUsuario}')`,
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

//Tipo dependencias
  createTpoDependencia: (req, res) => {
   
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const CreadoPor = req.body.CreadoPor;  

    if ((Nombre == null || /^[\s]*$/.test(Nombre)) ) {
      return res.status(409).send({
        error: "Ingrese Nombre valido.",
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
        `CALL sp_CrearTpoDependencia('${Nombre}','${Descripcion}','${CreadoPor}' )`,
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
  getTpoDependencias: (req, res) => {
   
    db.query(`CALL sp_ListaTpoDependencias()`, (err, result) => {
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
  modifyTpoDependencia: (req, res) => {
    const IdTpoDependencia = req.body.Id;
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;  
    const IdModificador = req.body.IdModificador;  

    if ((IdTpoDependencia == null || /^[\s]*$/.test(IdTpoDependencia)) ) {
        return res.status(409).send({
          error: "Ingrese IdTpoDependencia valido.",
        });
      } 

    if ((Nombre == null || /^[\s]*$/.test(Nombre)) ) {
      return res.status(409).send({
        error: "Ingrese Nombre valido.",
      });
    } 
    if ((Descripcion == null || /^[\s]*$/.test(Descripcion)) ) {
        return res.status(409).send({
          error: "Ingrese Descripcion válida.",
        });
      } 
      
      if ((IdModificador == null || /^[\s]*$/.test(IdModificador)) ) {
        return res.status(409).send({
          error: "Ingrese IdModificador válido.",
        });
      }
      db.query(
        `CALL sp_ModificaTipoDependencias('${IdTpoDependencia}','${Nombre}','${Descripcion}','${IdModificador}')`,
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
  deleteTipoDependencia: (req, res) => {
    const IdTipoD = req.body.Id;
    const IdUsuario = req.body.IdUsuario;
    db.query(
      `CALL sp_EliminarTipoDependencia('${IdTipoD}', '${IdUsuario}')`,
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