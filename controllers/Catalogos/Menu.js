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
    getMenus: (req, res) => {
        const IdApp=req.query.IdApp
        let query = `  SELECT men.Id, men.Menu, men.Descripcion FROM TiCentral.Menus men WHERE men.IdApp=? AND men.Deleted=0 ORDER BY men.Descripcion ASC`;
        db.query(query,[IdApp],(err, result) => {

            // console.log(err);
            // console.log(result);
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

    getMenusRol: (req, res) => {
        const IdRol=req.query.IdRol
        let query = ` SELECT rolmen.Id AS IdRelacion, men.Id, men.Menu, men.Descripcion  FROM TiCentral.RolMenus rolmen
        INNER JOIN TiCentral.Menus men ON men.Id = rolmen.idMenu
         WHERE rolmen.idRol=? AND rolmen.Deleted=0 ORDER BY men.Descripcion`;
        db.query(query,[IdRol],(err, result) => {

            // console.log(err);
            // console.log(result);
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

    deleteMenuRol: (req, res) => {
        const Id=req.body.Id
        console.log("req",req.body);
        let query = ` UPDATE ticentral.rolmenus rl SET rl.Deleted = 1 WHERE rl.Id = ?`;
        db.query(query,[Id],(err, result) => {

            console.log("err",err);
            console.log("result",result);
            if (err) {
                return res.status(500).send({
                    error:"No se elimino el acceso al menu",
                });
            }else{
                return res.status(200).send({
                    msg:"Se elimino el acceso al menu.",
                });
            }
        });
    },

    createMenuRol: (req, res) => {
        const IdRol=req.body.IdRol
        const IdMenu=req.body.IdMenu
        const CreadoPor=req.body.CreadoPor
        console.log("req",req.body);
        let query = `INSERT INTO  rolmenus(IdRol,IdMenu,CreadoPor,ModificadoPor)VALUES(?,?,?,?)`;
        db.query(query,[IdRol,IdMenu,CreadoPor,CreadoPor],(err, result) => {

            console.log("err",err);
            console.log("result",result.affectedRows);
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