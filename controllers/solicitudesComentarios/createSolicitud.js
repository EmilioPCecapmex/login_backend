
const db = require("../../config/db.js");



module.exports = {
    createSolicitud: (req, res) => {
        const Nombre = req.body.Nombre;
        const APaterno = req.body.APaterno;
        const AMaterno = req.body.AMaterno;
        const NombreUsuario = req.body.NombreUsuario;
        const Email = req.body.Email;
        const Curp = req.body.Curp;
        const RFC = req.body.RFC;
        const Celular = req.body.Celular;
        const Telefono = req.body.Telefono;
        const Extencion = req.body.Extencion;
        const TipoSolicitud = req.body.TipoSolicitud;
        const DatosAdicionales = req.body.DatosAdicionales;
        const IdApp = req.body.IdApp;
        const IdUsuarioCreador = req.body.CreadoPor;
        console.log(req.body);

        if (Nombre == null || /^[\s]*$/.test(Nombre)) {
            return res.status(409).send({
                error: "Ingrese Nombre",
            });
        }
        if (APaterno == null || /^[\s]*$/.test(APaterno)) {
            return res.status(409).send({
                error: "Ingrese Apellido Paterno",
            });
        }
        if (AMaterno == null || /^[\s]*$/.test(AMaterno)) {
            return res.status(409).send({
                error: "Ingrese Apellido Materno",
            });
        }
        if (NombreUsuario == null || /^[\s]*$/.test(NombreUsuario)) {
            return res.status(409).send({
                error: "Ingrese Nombre de Usuario",
            });
        }
        if (Email == null || /^[\s]*$/.test(Email)) {
            return res.status(409).send({
                error: "Ingrese Email",
            });
        }
        if (Curp == null || /^[\s]*$/.test(Curp)) {
            return res.status(409).send({
                error: "Ingrese Curp",
            });
        }
        if (RFC == null || /^[\s]*$/.test(RFC)) {
            return res.status(409).send({
                error: "Ingrese RFC",
            });
        }
        if (Celular == null || /^[\s]*$/.test(Celular)) {
            return res.status(409).send({
                error: "Ingrese Celular",
            });
        }
        if (Telefono == null || /^[\s]*$/.test(Telefono)) {
            return res.status(409).send({
                error: "Ingrese Telefono",
            });
        }
        if (Extencion == null || /^[\s]*$/.test(Extencion)) {
            return res.status(409).send({
                error: "Ingrese Extencion del Telefono",
            });
        }
        if (IdUsuarioCreador == null || /^[\s]*$/.test(IdUsuarioCreador)) {
            return res.status(409).send({
                error: "Ingrese ID Usuurio Creador",
            });
        }

        if (TipoSolicitud == null || /^[\s]*$/.test(TipoSolicitud)) {
            return res.status(409).send({
                error: "Ingrese tipo de solicitud",
            });
        } 


        if (DatosAdicionales == null ) {
            return res.status(409).send({
                error: "Ingrese Id Datos adicionales ",
            });
        }
        
        if (IdApp == null || /^[\s]*$/.test(IdApp)) {
            return res.status(409).send({
                error: "Ingrese Id App",
            });
        }

                db.query(`CALL sp_CreaSolicitud('${Nombre}','${APaterno}', '${AMaterno}', '${NombreUsuario}', '${Email}', '${Curp}', '${RFC}', '${Celular}', '${Telefono}', '${Extencion}', '${TipoSolicitud}', '${DatosAdicionales}', '${IdApp}','${IdUsuarioCreador}')`, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        error: "Error",
                    });
                }
                if (result.length) {
                    console.log(result);
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
            }
};