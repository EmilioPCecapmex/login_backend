const db = require("../../config/db.js");

module.exports = {
    getUsuarioEntidad: (req, res) => {
        const { idUsuario, idApp } = req.body;

        if (!idUsuario || !idApp) {
            return res.status(400).send({
                error: "Los parámetros idUsuario e idApp son requeridos.",
            });
        }

        db.query(`CALL sp_ListaUsuarioEntidades(?, ?)`, [idUsuario, idApp], (err, result) => {
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

    detalleEntidad: (req, res) => {
        const { IdEntidad } = req.body;
    
        if (!IdEntidad) {
            return res.status(400).send({
                error: "El parámetro IdEntidad es requerido.",
            });
        }
    
        // Llamado al Stored Procedure
        db.query(`CALL sp_DetalleEntidad(?)`, [IdEntidad], (err, result) => {
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
