
const db = require("../../config/db.js");
module.exports = {
    createComentario: (req, res) => {

        const IdUsuario = req.body.CreadoPor;
        const IdSolicitud = req.body.IdSolicitud;
        const Comentario = req.body.Comentario;
        if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
            return res.status(409).send({
                error: "Ingrese ID Usuario",
            });
        }

        if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
            return res.status(409).send({
                error: "Ingrese Id Solicitud",
            });
        } 

        if (Comentario == null || /^[\s]*$/.test(Comentario)) {
            return res.status(409).send({
                error: "Ingrese Comentario",
            });
        } 


            db.query(`CALL sp_CreaComentarioSol('${IdUsuario}', '${IdSolicitud}', '${Comentario}')`, (err, result) => {
                if (err) {
                    return res.status(500).send({
                        error: "Error",
                    });
                }
                if (result.length) {
                    const data = result[0];
                    if (data.error) {
                        return res.status(409).send({
                            result: data,
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
};