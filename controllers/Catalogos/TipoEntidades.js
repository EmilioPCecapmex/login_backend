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

            let error = "Ingrese:";
            if (!Nombre) error += " Nombre,";
            if (!Descripcion) error += " Descripcion,";
            if (!IdUsuario) error += " IdUsuario";
        
            // Elimina la última coma si existe
            error = error.endsWith(',') ? error.slice(0, -1) : error;
            //Remplaza la ultima coma por un " y "
            error = error.replace(/,([^,]*)$/, ' y$1');

            return res.status(400).send({
                error: error,
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
            let error = "Ingrese:";
    
            if (!Id) error += " Id,";
            if (!Nombre) error += " Nombre,";
            if (!Descripcion) error += " Descripcion,";
            if (!IdUsuario) error += " IdUsuario";
        
            // Elimina la última coma si existe
            error = error.endsWith(',') ? error.slice(0, -1) : error;
            //Remplaza la ultima coma por un " y "
            error = error.replace(/,([^,]*)$/, ' y$1');

            return res.status(400).send({
                error: error,
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
        const { Id, IdUsuario } = req.body;
    
        if (!Id || !IdUsuario) {
            return res.status(400).send({
                error: "Los parámetros Id y IdUsuario son requeridos.",
            });
        }
    
        db.query(`CALL sp_EliminarTipoEntidad(?, ?)`, [Id, IdUsuario], (err, result) => {
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
