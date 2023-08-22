const db = require("../../config/db.js");

module.exports = {

    //LISTADO COMPLETO
    getMenus: (req, res) => {
        const IdApp=req.query.IdApp
        let query = `  SELECT men.Id, men.Menu, men.Descripcion FROM TiCentral.Menus men WHERE men.IdApp=? AND men.Deleted=0 ORDER BY men.Descripcion ASC`;
        db.query(query,[IdApp],(err, result) => {

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
        let query = ` UPDATE TiCentral.RolMenus rl SET rl.Deleted = 1 WHERE rl.Id = ?`;
        db.query(query,[Id],(err, result) => {

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
        let query = `INSERT INTO  RolMenus(IdRol,IdMenu,CreadoPor,ModificadoPor)VALUES(?,?,?,?)`;
        db.query(query,[IdRol,IdMenu,CreadoPor,CreadoPor],(err, result) => {

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
    
};