const db = require("../../config/db.js");

module.exports = {
    getUsuarioEntidad: (req, res) => {
        // Aquí puedes obtener los parámetros del request si los necesitas.
        // Por ejemplo, suponiendo que los pasas como query parameters:
        const { idUsuario, idApp } = req.body;


        // Valida que ambos parámetros estén presentes
        if (!idUsuario || !idApp) {
            return res.status(400).send({
                error: "Los parámetros idUsuario e idApp son requeridos.",
            });
        }

        // Llamado al Stored Procedure
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
    }
}
