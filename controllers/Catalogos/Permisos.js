const db = require("../../config/db.js");

module.exports = {

    //LISTADO COMPLETO
    getPermisosMenu: (req, res) => {
        const IdMenu = req.query.IdMenu
        const IdApp = req.query.IdApp
        let query = `SELECT per.Id,per.Permiso,per.Descripcion,per.IdMenu,per.IdApp  FROM  TiCentral.Permisos per WHERE per.IdMenu=? AND  per.IdApp=? AND  per.Deleted=0 ORDER BY per.Descripcion ASC`;


        db.query(query, [IdMenu, IdApp], (err, result) => {

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
        const IdMenu = req.query.IdMenu
        const IdRol = req.query.IdRol
        let query = ` SELECT menper.Id AS IdRelacion,per.Id,per.Permiso,per.Descripcion,per.IdMenu,per.IdApp 
        FROM TiCentral.MenuPermisos menper 
        INNER JOIN TiCentral.Permisos per ON  per.Id=menper.idPermiso 
        WHERE menper.idMenu=? AND menper.idRol=? AND menper.Deleted=0 ORDER BY per.Descripcion ASC`;
        db.query(query, [IdMenu, IdRol], (err, result) => {

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
        const IdMenu = req.body.IdMenu
        const IdRol = req.body.IdRol
        const CreadoPor = req.body.CreadoPor
        const IdPermiso = req.body.IdPermiso
        console.log("req", req.body);
        let query = `INSERT INTO MenuPermisos (CreadoPor, ModificadoPor,idMenu, idPermiso, idRol) VALUES (?,?,?,?,?)`;
        db.query(query, [CreadoPor, CreadoPor, IdMenu, IdPermiso, IdRol], (err, result) => {

            console.log("err", err);
            console.log("result", result?.affectedRows);
            if (err) {
                return res.status(500).send({
                    msg: "No se otorgo el acceso al menu",
                });
            }

            if (result.affectedRows === 1) {
                return res.status(200).send({
                    msg: "Se otorgo el acceso al menu.",
                });
            } else {
                return res.status(500).send({
                    msg: "No se otorgo el acceso al menu.",
                });
            }
        });
    },

    deletedPermisosMenuRol: (req, res) => {
        const Id = req.body.Id
        console.log("req", req.body);
        let query = `DELETE FROM TiCentral.MenuPermisos WHERE Id = ?`;
        db.query(query, [Id], (err, result) => {

            console.log("err", err);
            console.log("result", result?.affectedRows);
            if (err) {
                return res.status(500).send({
                    msg: "No se otorgo el acceso al menu",
                });
            }

            if (result.affectedRows === 1) {
                return res.status(200).send({
                    msg: "Se otorgo el acceso al menu.",
                });
            } else {
                return res.status(500).send({
                    msg: "No se otorgo el acceso al menu.",
                });
            }
        });
    },
};