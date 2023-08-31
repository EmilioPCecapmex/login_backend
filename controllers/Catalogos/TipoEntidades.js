const db = require("../../config/db.js");

module.exports = {

    // ... tus otros endpoints ...

    getTipoEntidades: (req, res) => {
        // Llamado al Stored Procedure
        db.query(`CALL sp_ListaTipoEntidades()`, (err, result) => {
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

    crearTipoEntidad: (req, res) => {
        const { Nombre, Descripcion, IdUsuario } = req.body;
    
        if (!Nombre || !Descripcion || !IdUsuario) {
            return res.status(400).send({
                error: "Los parámetros Nombre, Descripcion e IdUsuario son requeridos.",
            });
        }
    
        // Llamado al Stored Procedure
        db.query(`CALL sp_CrearTipoEntidad(?, ?, ?)`, [Nombre, Descripcion, IdUsuario], (err, result) => {
            if (err) {
                return res.status(500).send({
                    error: err.sqlMessage,
                });
            }
    
            if (result.length) {
                const data = result[0][0]; // Primero [0] para el conjunto de resultados, segundo [0] para el primer registro
                if (data.ERROR) {
                    return res.status(409).send({
                        error: data.ERROR,
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
        });
    },

    editarTipoEntidad: (req, res) => {
        const { Id, Nombre, Descripcion, IdUsuario } = req.body;
    
        if (!Id || !Nombre || !Descripcion || !IdUsuario) {
            return res.status(400).send({
                error: "Los parámetros Id, Nombre, Descripcion e IdUsuario son requeridos.",
            });
        }
    
        db.query(`CALL sp_EditarTipoEntidad(?, ?, ?, ?)`, [Id, Nombre, Descripcion, IdUsuario], (err, result) => {
            if (err) {
                return res.status(500).send({
                    error: err.sqlMessage,
                });
            }
    
            if (result.length) {
                const data = result[0];
                if (data.ERROR) {
                    return res.status(409).send({
                        error: data.ERROR,
                    });
                } else {
                    return res.status(200).send({
                        data,
                    });
                }
            } else {
                return res.status(409).send({
                    error: "Error al actualizar el tipo de entidad.",
                });
            }
        });
    },

    eliminarTipoEntidad: (req, res) => {
        const { ch_IdTipoE, ch_IdUsuario } = req.body;
    
        if (!ch_IdTipoE || !ch_IdUsuario) {
            return res.status(400).send({
                error: "Los parámetros ch_IdTipoD y ch_IdUsuario son requeridos.",
            });
        }
    
        db.query(`CALL sp_EliminarTipoEntidad(?, ?)`, [ch_IdTipoE, ch_IdUsuario], (err, result) => {
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
    }
    
    


}
