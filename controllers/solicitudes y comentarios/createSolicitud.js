
const db = require("../../config/db.js");
module.exports = {
    createSolicitud: (req, res) => {

        const IdUsuario = req.body.IdUsuario;
        const DatosAdicionales = req.body.DatosAdicionales;
        const TipoSolicitud = req.body.TipoSolicitud;
        const IdUsuarioCreador = req.body.CreadoPor;
        const IdApp = req.body.IdApp;

        if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
            return res.status(409).send({
                error: "Ingrese ID Institucion",
            });
        }
        if (IdUsuarioCreador == null || /^[\s]*$/.test(IdUsuarioCreador)) {
            return res.status(409).send({
                error: "Ingrese ID Institucion",
            });
        }

        if (TipoSolicitud == null || /^[\s]*$/.test(TipoSolicitud)) {
            return res.status(409).send({
                error: "Ingrese tipo de solicitud",
            });
        } 
        if (IdApp == null || /^[\s]*$/.test(IdApp)) {
            return res.status(409).send({
                error: "Ingrese Id App",
            });
        } 


            db.query(`CALL sp_CreaSolicitud('${IdUsuario}', '${DatosAdicionales}', '${TipoSolicitud}', '${IdUsuarioCreador}', '${IdApp}')`, (err, result) => {
                if (err) {
                    return res.status(500).send({
                        error: "Error",
                    });
                }
                if (result.length) {
                    const data = result;
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