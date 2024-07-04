const db = require("../../config/db.js");

module.exports = {

    //LISTADO COMPLETO
    getPermisosMenu: (req, res) => {
        const IdMenu = req.query.IdMenu
        const IdApp = req.query.IdApp
        db.query(`CALL sp_ListaPermisosMenu('${IdMenu}','${IdApp}')`, (err, result) => {
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

    getPermisosMenuRol: (req, res) => {
        const IdMenu = req.query.IdMenu
        const IdRol = req.query.IdRol
        db.query(`CALL sp_ListaPermisosMenuRol('${IdMenu}','${IdRol}')`, (err, result) => {
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
    createPermisosMenuRol: (req, res) => {
        const IdMenu = req.body.IdMenu
        const IdRol = req.body.IdRol
        const CreadoPor = req.body.CreadoPor
        const IdPermiso = req.body.IdPermiso
        db.query(`CALL sp_CrearPermisosMenuRol('${IdMenu}','${IdPermiso}','${IdRol}','${CreadoPor}')`, (err, result) => {
            if (err) {
                return res.status(500).send({
                    msg: "No se otorgo el permiso. "+err,
                });
            }

            if (result.affectedRows > 0) {
                return res.status(200).send({
                    msg: "Se otorgo el permiso.",
                });
            } else {
                return res.status(500).send({
                    msg: "No se otorgo el permiso. "+result[0][0]?.Message,
                });
            }
        });
    },

    deletedPermisosMenuRol: (req, res) => {
        const {Id,CreadoPor} = req.body
        let query = `DELETE FROM TiCentral.MenuPermisos WHERE Id = ?`;
        db.query(`CALL sp_EliminarPermisoMenuRol(?,?)`,[Id,CreadoPor], (err, result) => {
            if (err) {
                return res.status(500).send({
                    msg: "No se eliminó el permiso. "+err.sqlMessage,
                });
            }

            if (result.affectedRows > 0) {
                return res.status(200).send({
                    msg: "Se eliminó el permiso.",
                });
            } else {
                return res.status(500).send({
                    msg: "No se eliminó el permiso.",
                });
            }
        });
    },
};