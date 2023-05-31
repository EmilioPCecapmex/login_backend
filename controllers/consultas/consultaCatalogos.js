
const db = require("../../config/db.js");

module.exports = {

    consultaCatalogos: (req, res) => {
        const cat = req.body.cat;
        const opcion = req.body.opcion;


if(opcion==="select"){

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


    if(cat==="2")
    {
      db.query(
          `SELECT 
          ap.Id value,
          ap.Nombre label
          FROM TiCentral.Apps ap
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
              FROM TiCentral.Perfil pe
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
              db.query(
                  `SELECT *
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
    
    
     
        /// catalogo de unidad responsable
        if(cat==="2")
        {
          db.query(
              `SELECT 
              ur.id,
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
        
        ///// Departamentos
        if(cat==="3")
        {
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
            /// Roles
            if(cat==="4")
            {
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
            /// Perfil
            if(cat==="5")
            {
              db.query(
                  `SELECT *
                  FROM TiCentral.Perfil pe
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
        }
          },
        };
        
        
        
        
        
