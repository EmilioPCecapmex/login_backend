const db = require("../../config/db.js");
module.exports = {

  createAdminAvisos: (req, res) => {
    const { Apps, Titulo, TextoInc, IdUsuario, FechaInicio, FechaFin } = req.body;
    let error = "Ingrese:";
    let appsArray = JSON.parse(Apps);

    // Validaciones iniciales
    if (appsArray.length === 0) {
        error += " Aplicaciones,";
    }
    if (!TextoInc || (/^[\s]*$/.test(TextoInc))) {
        error += " Aviso,";
    }
    if (!IdUsuario || (/^[\s]*$/.test(IdUsuario))) {
        error += " IdUsuario,";
    }
    if (!FechaInicio || (/^[\s]*$/.test(FechaInicio))) {
        error += " Fecha Inicio,";
    }
    if (!FechaFin || (/^[\s]*$/.test(FechaFin))) {
        error += " Fecha Fin,";
    }
    if (!Titulo || (/^[\s]*$/.test(Titulo))) {
        error += " Titulo,";
    }

    // Si hay errores, enviar respuesta con error 400
    if (error !== "Ingrese:") {
        error = error.endsWith(',') ? error.slice(0, -1) : error;
        error = error.replace(/,([^,]*)$/, ' y$1');
        return res.status(400).send({ error });
    }

    // Iniciar la transacción
    db.beginTransaction(err => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }

        const queries = [];

        // Construir las consultas para cada elemento en appsArray
        appsArray.forEach(app => {
            queries.push(new Promise((resolve, reject) => {
                const { Id } = app; // Asumiendo que Id es necesario para cada llamada a sp_CrearAviso
                db.query(`CALL sp_CrearAviso(?,?,?,?,?,?)`, [Id, TextoInc, IdUsuario, FechaInicio, FechaFin, Titulo, 0], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length) {
                            resolve(result[0]);
                        } else {
                            reject(new Error("¡Sin Información!"));
                        }
                    }
                });
            }));
        });

        // Ejecutar todas las consultas en paralelo
        Promise.all(queries)
            .then(results => {
                // Commit si todas las consultas fueron exitosas
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).send({ error: err.message });
                        });
                    }
                    res.status(200).send({ data: results });
                });
            })
            .catch(err => {
                // Rollback en caso de error en alguna consulta
                db.rollback(() => {
                    res.status(500).send({ error: err.message });
                });
            });
    });
},

  // createAdminAvisos: (req, res) => {
  //   const {Apps,Titulo,TextoInc,IdUsuario,FechaInicio,FechaFin} = req.body;
  //           let contError=0;
  //           let error = "Ingrese:";
  //           let appsArray=JSON.parse(Apps)
            
    
  //               if (appsArray.length===0)
  //               {
  //                   error += " Aplicaciones,";
  //                   contError++;
  //               }
  //               if (!TextoInc || (/^[\s]*$/.test(TextoInc)))
  //               {
  //                   error += " Aviso,";
  //                   contError++;
  //               } 
  //               if (!IdUsuario || (/^[\s]*$/.test(IdUsuario)))
  //               {
  //                   error += " IdUsuario,";
  //                   contError++;
  //               } 
  //               if (!FechaInicio || (/^[\s]*$/.test(FechaInicio)))
  //               {
  //                   error += " Fecha Inicio";
  //                   contError++;
  //               } 
  //               if (!FechaFin || (/^[\s]*$/.test(FechaFin)))
  //               {
  //                   error += " Fecha Fin";
  //                   contError++;
  //               } 
  //               if (!Titulo || (/^[\s]*$/.test(Titulo)))
  //                 {
  //                     error += " Titulo";
  //                     contError++;
  //                 } 
            
  //               // Elimina la última coma si existe
  //               error = error.endsWith(',') ? error.slice(0, -1) : error;
  //               //Remplaza la ultima coma por un " y "
  //               error = error.replace(/,([^,]*)$/, ' y$1');
  //               console.log("Apps",Apps);
  //               // console.log("fecha fin",FechaFin);
        
  //            if (contError!=0) {
  //               return res.status(400).send({
  //                   error: error,
  //               });
  //            }
  //           db.query(`CALL sp_CrearAviso(?,?,?,?,?,?)`,[Id,TextoInc,IdUsuario,FechaInicio,FechaFin,Titulo,0], (err, result) => {
  //            if (err) {
  //              return res.status(500).send({
  //                error: err,
  //              });
  //            }
       
  //            if (result.length) {
  //              const data = result[0];
  //              return res.status(200).send({
  //                data,
  //              });
  //            } else {
  //              return res.status(409).send({
  //                error: "¡Sin Información!",
  //              });
  //            }
  //          });
  // },  

  getAdminAvisos:(req,res)=>{
    const {IdApp} = req.query;

    let contError=0;
         let error = "Ingrese:";
 
             if (!IdApp || (/^[\s]*$/.test(IdApp)))
             {
                 error += " ch_IdApp";
                 contError++;
             } 
         
             // Elimina la última coma si existe
             error = error.endsWith(',') ? error.slice(0, -1) : error;
             //Remplaza la ultima coma por un " y "
             error = error.replace(/,([^,]*)$/, ' y$1');
     
          if (contError!=0) {
             return res.status(400).send({
                 error: error,
             });
          }
 
          db.query(`CALL sp_ListaAvisos(?)`,[IdApp], (err, result) => {
             if (err) {
               return res.status(500).send({
                 error: err,
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

editarAdminAvisos:(req, res) =>{
    const { Id, Titulo, TextoInc, FechaInicio, FechaFin, IdUsuario} = req.body;

    console.log("res",res); 
      
          if (!Id || !TextoInc || !FechaInicio || !FechaFin|| !IdUsuario ||!Titulo) {
              let error = "Ingrese:";
      
              if (!Id) error += " Id,";
              if (!TextoInc) error += " Aviso,";
              if (!FechaInicio) error += " Fecha Inicio,";
              // if (!Descripcion) error += " Descripcion,";
              if (!FechaFin) error += " Fecha Fin,";
              if (!IdUsuario) error += " IdUsuario,";
              if (!Titulo) error += " Titulo,";
             
          
              // Elimina la última coma si existe
              error = error.endsWith(',') ? error.slice(0, -1) : error;
              //Remplaza la ultima coma por un " y "
              error = error.replace(/,([^,]*)$/, ' y$1');
  
              return res.status(400).send({
                  error: error,
              });
          }
      
          db.query(`CALL sp_EditarAviso(?, ?, ?, ?, ?, ? )`, [Id, TextoInc, FechaInicio, FechaFin, IdUsuario,Titulo], (err, result) => {
            console.log("err",err);
              if (err) {
                  return res.status(500).send({
                      error: err.sqlMessage,
                  });
              }else{
                const data = "Éxito";
                return res.status(200).send({

                  data,
              });
              }
              // console.log("result.length",result.length);
              // console.log("result",result);
              // if (result.length) {
                  
              //     if (data.ERROR) {
              //         return res.status(409).send({
              //             error: data.ERROR,
              //         });
              //     } else {
              //         return res.status(200).send({
              //             data,
              //         });
              //     }
              // } else {
              //     return res.status(409).send({
              //         error: "Error al actualizar el aviso.",
              //     });
              // }
          });
},

deleteAdminAvisos:(req,res)=>{
  const {IdAviso,IdUsuario} = req.body;

  let contError=0;
       let error = "Ingrese:";

           if (!IdAviso || (/^[\s]*$/.test(IdAviso)))
           {
               error += " IdAviso,";
               contError++;
           } 

           if (!IdUsuario || (/^[\s]*$/.test(IdUsuario)))
           {
               error += " IdUsuario";
               contError++;
           } 
       
           // Elimina la última coma si existe
           error = error.endsWith(',') ? error.slice(0, -1) : error;
           //Remplaza la ultima coma por un " y "
           error = error.replace(/,([^,]*)$/, ' y$1');
   
        if (contError!=0) {
           return res.status(400).send({
               error: error,
           });
        }

        db.query(`CALL sp_EliminarAviso(?,?)`,[IdAviso,IdUsuario], (err, result) => {
          if (err) {
            return res.status(500).send({
                error: err.sqlMessage,
            });
        }else{
          const data = "Éxito";
          return res.status(200).send({

            data,
        });
        }
          //  if (err) {
          //    return res.status(500).send({
          //      error: err,
          //    });
          //  }
     
          //  if (result.length) {
          //    const data = result[0];
          //    return res.status(200).send({
          //      data,
          //    });
          //  } else {
          //    return res.status(409).send({
          //      error: "¡Sin Información!",
          //    });
          //  }
         });
},

getAdminAvisos:(req,res)=>{
  const {IdApp} = req.query;

  let contError=0;
       let error = "Ingrese:";

           if (!IdApp || (/^[\s]*$/.test(IdApp)))
           {
               error += " ch_IdApp";
               contError++;
           } 
       
           // Elimina la última coma si existe
           error = error.endsWith(',') ? error.slice(0, -1) : error;
           //Remplaza la ultima coma por un " y "
           error = error.replace(/,([^,]*)$/, ' y$1');
   
        if (contError!=0) {
           return res.status(400).send({
               error: error,
           });
        }

        db.query(`CALL sp_ListaAvisos(?)`,[IdApp], (err, result) => {
           if (err) {
             return res.status(500).send({
               error: err,
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

getAvisosVigentes:(req,res)=>{
  const {IdApp} = req.query;
  console.log("IdApp",IdApp);
  let contError=0;
       let error = "Ingrese:";

           if (!IdApp || (/^[\s]*$/.test(IdApp)))
           {
               error += " IdApp";
               contError++;
           } 
       
           // Elimina la última coma si existe
           error = error.endsWith(',') ? error.slice(0, -1) : error;
           //Remplaza la ultima coma por un " y "
           error = error.replace(/,([^,]*)$/, ' y$1');
   
        if (contError!=0) {
           return res.status(400).send({
               error: error,
           });
        }

        db.query(`CALL sp_ListaAvisosVigentes(?)`,[IdApp], (err, result) => {
          console.log('err',err);
           if (err) {
             return res.status(500).send({
               error: err,
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

}

