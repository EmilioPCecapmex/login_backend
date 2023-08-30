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
    },

    crearEntidad: (req, res) => {
        const {
            Nombre, Direccion, Telefono, IdTipoEntidad, IdTitular, 
            PerteneceA, ControlInterno, ClaveSiregob, IdUsuario
        } = req.body;
    
        // Valida que todos los parámetros requeridos estén presentes
        if (!(Nombre && Direccion && Telefono && IdTipoEntidad && IdTitular && IdUsuario)) {
            return res.status(400).send({
                error: "Por favor proporciona todos los campos necesarios.",
            });
        }
    
        // Llamado al Stored Procedure
        db.query(
            `CALL sp_CrearEntidad(?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [Nombre, Direccion, Telefono, IdTipoEntidad, IdTitular, PerteneceA, ControlInterno, ClaveSiregob, IdUsuario],
            (err, result) => {
                if (err) {
                    return res.status(500).send({
                        error: err.sqlMessage,
                    });
                }
    
                // En este punto, la entidad ha sido creada
                return res.status(201).send({
                    message: "Entidad creada exitosamente.",
                });
            }
        );
    }
    
    
    
}
