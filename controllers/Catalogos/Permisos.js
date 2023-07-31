const db = require("../../config/db.js");

module.exports = {
    //CREAR
    //   createPerfil: (req, res) => {

    //     const Descripcion = req.body.Descripcion;
    //     const Referencia = req.body.Referencia;  
    //     const CreadoPor = req.body.CreadoPor;  


    //       if ((Descripcion == null || /^[\s]*$/.test(Descripcion)) ) {
    //         return res.status(409).send({
    //           error: "Ingrese Descripcion válido.",
    //         });
    //       }
    //       if ((Referencia == null || /^[\s]*$/.test(Referencia)) ) {
    //         return res.status(409).send({
    //           error: "Ingrese Referencia válido.",
    //         });
    //       }
    //       if ((CreadoPor == null || /^[\s]*$/.test(CreadoPor)) ) {
    //         return res.status(409).send({
    //           error: "Ingrese CreadoPor válido.",
    //         });
    //       }

    //       db.query(
    //         `CALL sp_CrearPerfil('${Descripcion}','${Referencia}', '${CreadoPor}')`,
    //         (err, result) => {
    //           if (err) {
    //             return res.status(500).send({
    //               error: err.sqlMessage,
    //             });
    //           }
    //           if (result.length) {
    //             const data = result[0][0];
    //             if (data.error) {
    //               return res.status(409).send({
    //                 result: data,
    //               });
    //             }
    //             return res.status(200).send({
    //               data,
    //             });
    //           } else {
    //             return res.status(409).send({
    //               error: "¡Sin Información!",
    //             });
    //           }
    //         }
    //       );

    //   },

    //LISTADO COMPLETO
    getPermisosMenu: (req, res) => {
        const IdMenu=req.query.IdMenu
        const IdApp=req.query.IdApp
        let query = `SELECT per.Id,per.Permiso,per.Descripcion,per.IdMenu,per.IdApp  FROM  permisos per WHERE per.IdMenu=? AND  per.IdApp=? AND  per.Deleted=0 ORDER BY per.Descripcion ASC`;
        
        
        db.query(query,[IdMenu,IdApp],(err, result) => {

            console.log(err);
            console.log(result);
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

    getPermisosMenuRol: (req, res) => {
        const IdMenu=req.query.IdMenu
        const IdRol=req.query.IdRol
        let query = ` SELECT menper.Id AS IdRelacion,per.Id,per.Permiso,per.Descripcion,per.IdMenu,per.IdApp 
        FROM ticentral.menupermisos menper 
        INNER JOIN ticentral.permisos per ON  per.Id=menper.idPermiso 
        WHERE menper.idMenu=? AND menper.idRol=? AND menper.Deleted=0 ORDER BY per.Descripcion ASC`;
        db.query(query,[IdMenu,IdRol],(err, result) => {

            console.log(err);
            console.log(result);
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
    createPermisosMenuRol: (req, res) => {
        const IdMenu=req.body.IdMenu
        const IdRol=req.body.IdRol
        const CreadoPor=req.body.CreadoPor
        const IdPermiso=req.body.IdPermiso
        console.log("req",req.body);
        let query = `INSERT INTO menupermisos (CreadoPor, ModificadoPor,idMenu, idPermiso, idRol) VALUES (?,?,?,?,?)`;
        db.query(query,[CreadoPor,CreadoPor,IdMenu,IdPermiso,IdRol],(err, result) => {

            console.log("err",err);
            console.log("result",result?.affectedRows);
            if (err) {
                return res.status(500).send({
                    msg:"No se otorgo el acceso al menu",
                });
            }
            
            if(result.affectedRows===1){
                return res.status(200).send({
                    msg:"Se otorgo el acceso al menu.",
                });
            }else{
                return res.status(500).send({
                    msg:"No se otorgo el acceso al menu.",
                });
            }
        });
    },

    deletedPermisosMenuRol: (req, res) => {
        const Id=req.body.Id
        console.log("req",req.body);
        let query = `UPDATE ticentral.menupermisos men SET men.Deleted= 1 WHERE men.Id=?`;
        db.query(query,[Id],(err, result) => {

            console.log("err",err);
            console.log("result",result?.affectedRows);
            if (err) {
                return res.status(500).send({
                    msg:"No se otorgo el acceso al menu",
                });
            }
            
            if(result.affectedRows===1){
                return res.status(200).send({
                    msg:"Se otorgo el acceso al menu.",
                });
            }else{
                return res.status(500).send({
                    msg:"No se otorgo el acceso al menu.",
                });
            }
        });
    },


  //MODIFICA POR ID
//   modifyPerfil: (req, res) => {
//     const IdPerfil = req.body.Id;
//     const Descripcion = req.body.Descripcion;
//     const Referencia = req.body.Referencia; 
//     const IdModificador = req.body.IdModificador;  

//     if ((IdPerfil == null || /^[\s]*$/.test(IdPerfil)) ) {
//         return res.status(409).send({
//           error: "Ingrese IdPerfil valido.",
//         });
//       } 

//       if ((Descripcion == null || /^[\s]*$/.test(Descripcion)) ) {
//         return res.status(409).send({
//           error: "Ingrese Descripcion válido.",
//         });
//       }
//       if ((Referencia == null || /^[\s]*$/.test(Referencia)) ) {
//         return res.status(409).send({
//           error: "Ingrese Referencia válido.",
//         });
//       }
//       if ((IdModificador == null || /^[\s]*$/.test(IdModificador)) ) {
//         return res.status(409).send({
//           error: "Ingrese IdModificador válido.",
//         });
//       }
//       db.query(
//         `CALL sp_ModificaPerfil('${IdPerfil}','${Descripcion}','${Referencia}','${IdModificador}')`,
//         (err, result) => {
//           if (err) {
//             return res.status(500).send({
//               error: err.sqlMessage,
//             });
//           }
//           if (result.length) {
//             const data = result[0][0];
//             if (data.error) {
//               return res.status(409).send({
//                 result: data,
//               });
//             }
//             return res.status(200).send({
//               result: data,
//             });
//           } else {
//             return res.status(409).send({
//               error: "¡Sin Información!",
//             });
//           }
//         }
//       );

//   },

   //Detalle

  //Borrado
//   deletePerfil: (req, res) => {
//     const IdPerfil = req.body.Id;
//     const IdUsuario = req.body.IdUsuario;
//     db.query(
//       `CALL sp_EliminarPerfil('${IdPerfil}', '${IdUsuario}')`,
//       (err, result) => {
//         if (err) {
//           if(err.sqlMessage){
//             return res.status(500).send({
//               error: err.sqlMessage,
//             });
//           }else{
//             return res.status(500).send({
//               error: "Error",
//             });
//           }

//         }
//         if (result.length) {
//           const data = result[0][0];
//           if (data.error) {
//             return res.status(409).send({
//               result: data,
//            });
//           }
//          return res.status(200).send({
//             result: data,
//          });
//        } else {
//           return res.status(409).send({
//             error: "¡Sin Información!",
//           });
//         }
//       }
//     );
//   }, 

  
};