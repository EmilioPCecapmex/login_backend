const db = require("../../config/db.js");

module.exports = {

    //LISTADO COMPLETO
    getMenus: (req, res) => {
        const IdApp=req.query.IdApp
        db.query(`CALL sp_ListaMenu('${IdApp}')`, (err, result) => {
            if (err) {
                return res.status(500).send({
                error: "Error: "+err.sqlMessage,
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

    getMenusRol: (req, res) => {
        const IdRol=req.query.IdRol
        db.query(`CALL sp_ListaMenuRol('${IdRol}')`, (err, result) => {
            if (err) {
                return res.status(500).send({
                error: "Error: "+err.sqlMessage,
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

    deleteMenuRol: (req, res) => {
        const Id=req.body.Id
        db.query(`CALL sp_EliminarRolMenu('${Id}')`,(err, result) => {
            if (err) {
                return res.status(500).send({
                    error:"No se elimino el acceso al menu",
                });
            }else{
                if(result.affectedRows>0){
                    return res.status(200).send({
                        msg:"Se elimino el acceso al menu. "
                    });
                } else {
                    return res.status(500).send({
                        error:"No se elimino el acceso al menu",
                    });
                }
            }
        });
    },

    createMenuRol: (req, res) => {
        const IdRol=req.body.IdRol
        const IdMenu=req.body.IdMenu
        const CreadoPor=req.body.CreadoPor
        db.query(`CALL sp_CrearRolMenu('${IdRol}','${IdMenu}','${CreadoPor}')`,(err, result) => {

            if (err) {
                return res.status(500).send({
                    msg:"No se creo el acceso al menu. "+err.sqlMessage ,
                });
            }
            
            if(result.affectedRows>0){
                return res.status(200).send({
                    msg:"Se creo el acceso al menu. ",
                });
            }else{
                return res.status(406).send({
                    msg:"No se creo el acceso al menu. "+result[0][0]?.Message,
                });
            }
        });
    },
    
};