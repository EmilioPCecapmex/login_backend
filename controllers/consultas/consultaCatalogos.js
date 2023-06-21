
const db = require("../../config/db.js");

module.exports = {

    consultaCatalogos: (req, res) => {
        const cat = req.body.cat;
        /// "select" es para las consultas  de los select
        /// "catalogo" para los crud de los catalogos
        const opcion = req.body.opcion;
        // -- Tipo--
        /// "1" alta
        /// "2" baja
        /// "3" cambio
        //   "4" consulta
        const tipo = req.body.tipo;



if(opcion==="select"){

    //secretarias
    if(cat==="1")
    {

          db.query(
              `SELECT 
              sec.Id AS value ,
              sec.Nombre AS label 
               FROM TiCentral.Secretarias sec`, 
             (err, result) => {
      
                  if (err) {
                      return res.status(500).send({
                        error: "Error",
                      });
                    }
                    if (result.length) {
                      const data = result;
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
              }
            ); 
    
    }

    //APPS
    if(cat==="2")
    {
      db.query(
          `SELECT 
          ap.Id value,
          ap.Nombre label
          FROM TiCentral.Apps ap WHERE ap.EstaActivo AND ap.Deleted = 0
          `, 
         (err, result) => {
  
              if (err) {
                  return res.status(500).send({
                    error: "Error",
                  });
                }
                if (result.length) {
                  const data = result;
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
          }
        ); 

   }
    /// catalogo de unidad responsable
    if(cat==="3")
    {
      db.query(
          `SELECT 
          ur.id value,
          CONCAT (ur.Clave,' ',ur.Descripcion) label 
           FROM TiCentral.UResponsable ur
          `, 
         (err, result) => {
    
              if (err) {
                  return res.status(500).send({
                    error: "Error",
                  });
                }
                if (result.length) {
                  const data = result;
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
          }
        ); 
    
    }
    
    ///// Departamentos
    if(cat==="4")
    {
      db.query(
          `SELECT 
          de.id value,
          CONCAT ('(',de.NombreCorto,') - ',de.Descripcion) label
          FROM TiCentral.Departamentos de
          WHERE de.deleted=0
          `, 
         (err, result) => {
    
              if (err) {
                  return res.status(500).send({
                    error: "Error",
                  });
            }
            if (result.length) {
              const data = result;
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
              }
            ); 
        
        }
        /// Roles
        if(cat==="5")
        {
          db.query(
              `SELECT 
              ro.id value,
              ro.Nombre label
              FROM TiCentral.Roles ro
              WHERE ro.deleted=0
              `, 
             (err, result) => {
        
                  if (err) {
                      return res.status(500).send({
                        error: "Error",
                      });
                    }
                    if (result.length) {
                      const data = result;
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
              }
            ); 
        
        }
        /// Perfil
        if(cat==="6")
        {
          db.query(
              `SELECT 
              pe.id value,
              pe.Descripcion label
              FROM TiCentral.Perfiles pe
              WHERE pe.deleted=0
              
              `, 
             (err, result) => {
        
                  if (err) {
                      return res.status(500).send({
                        error: "Error",
                      });
                    }
                    if (result.length) {
                      const data = result;
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
              }
            ); 
        
        }
        if(cat==="7")
    {
          db.query(
              `SELECT 
              sec.Id AS value ,
              sec.Nombre AS label 
               FROM TiCentral.Secretarias sec`, 
             (err, result) => {
      
                  if (err) {
                      return res.status(500).send({
                        error: "Error",
                      });
                    }
                    if (result.length) {
                      const data = result;
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
              }
            ); 
    
    }
    }


    if(opcion==="catalogos"){

        if(cat==="1")
        {

          if(tipo==="4"){
              db.query(
                  `SELECT 
                  CreadoPor,
                  Deleted,
                  Direccion,
                  FechaDeCreacion,
                  Id,
                  IdTitular,
                  ModificadoPor,
                  Nombre,
                  Nombre_corto AS NombreCorto,
                  PerteneceA,
                  UltimaModificacion
                   FROM TiCentral.Secretarias sec
                   
                   `, 
                 (err, result) => {
          
                      if (err) {
                          return res.status(500).send({
                            error: "Error",
                          });
                        }
                        if (result.length) {
                          const data = result;
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
                  }
                ); 
          }
        
        }
    
    
     
        /// catalogo de unidad responsable
        if(cat==="2")
        {
          if(tipo==="4"){
          db.query(
              `SELECT 
              ur.Id,
              ur.UltimaActualizacion,
              ur.FechaCreacion,
              ur.Clave,
              ur.Descripcion
               FROM TiCentral.UResponsable ur
               where ur.deleted=0
              `, 
             (err, result) => {
        
                  if (err) {
                      return res.status(500).send({
                        error: "Error",
                      });
                    }
                    if (result.length) {
                      const data = result;
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
              }
            ); 
          }
        
        }
        
        ///// Departamentos
        if(cat==="3")
        {
          if(tipo==="4"){
          db.query(
              `SELECT *
              FROM TiCentral.Departamentos de
              WHERE de.deleted=0
              `, 
             (err, result) => {
        
                  if (err) {
                      return res.status(500).send({
                        error: "Error",
                      });
                }
                if (result.length) {
                  const data = result;
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
                  }
                ); 
          }
            
            }
            /// Roles
            if(cat==="4")
            {
              if(tipo==="4"){
              db.query(
                  `SELECT *
                  FROM TiCentral.Roles ro
                  WHERE ro.deleted=0
                  `, 
                 (err, result) => {
            
                      if (err) {
                          return res.status(500).send({
                            error: "Error",
                          });
                        }
                        if (result.length) {
                          const data = result;
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
                  }
                ); 
              }
            
            }
            /// Perfil
            if(cat==="5")
            {
              if(tipo==="4"){
              db.query(
                  `SELECT *
                  FROM TiCentral.Perfiles 
                  WHERE deleted=0                 
                  `, 
                 (err, result) => {
            
                      if (err) {
                          return res.status(500).send({
                            error: "Error",
                          });
                        }
                        if (result.length) {
                          const data = result;
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
                  }
                ); 
              }
            
            }
            //Dependencias
            if(cat==="6")
            {
              if(tipo==="4"){
              db.query(
                  `SELECT *
                  FROM TiCentral.Dependencias 
                  WHERE deleted=0                 
                  `, 
                 (err, result) => {
            
                      if (err) {
                          return res.status(500).send({
                            error: "Error",
                          });
                        }
                        if (result.length) {
                          const data = result;
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
                  }
                ); 
              }
            
            }
            if(cat==="7")
            {
              if(tipo==="4"){
              db.query(
                  `SELECT *
                  FROM TiCentral.TipoDependencias
                  WHERE deleted=0                 
                  `, 
                 (err, result) => {
            
                      if (err) {
                          return res.status(500).send({
                            error: "Error",
                          });
                        }
                        if (result.length) {
                          const data = result;
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
                  }
                ); 
              }
            
            }
            
        }
          },


            //LISTADO COMPLETO
  getUsuariosAsignables: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
   
    db.query(`CALL sp_ListaUsuariosAsignables('${IdUsuario}')`, (err, result) => {

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
        };
        
        
        
        
        