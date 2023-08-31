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
    }


}
