
const db = require("../../config/db.js");



module.exports = {
    createSolicitud: (req, res) => {
        const Nombre = req.body.Nombre;
        const APaterno = req.body.APaterno;
        const AMaterno = req.body.AMaterno;
        const NombreUsuario = req.body.NombreUsuario;
        const Email = req.body.Email;
        const Puesto = req.body.Puesto;
        const Curp = req.body.Curp;
        const RFC = req.body.RFC;
        const Celular = req.body.Celular;
        const Telefono = req.body.Telefono;
        const Extencion = req.body.Extencion;
        const TipoSolicitud = req.body.TipoSolicitud;
        const DatosAdicionales = req.body.DatosAdicionales;
        const IdApp = req.body.IdApp;
        const CreadoPor = req.body.CreadoPor;
        const IdUResponsable = req.body.IdUResponsable;
        const IdPerfil = req.body.IdPerfil;
        const IdRol = req.body.IdRol;
        const IdDepartamento = req.body.IdDepartamento;
        const IdTipoUsuario = req.body.IdTipoUsuario;
        const PuedeFirmar = req.body.PuedeFirmar;
        const Dependencia = req.body.Dependencia;
                
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
        if (Puesto == null || /^[\s]*$/.test(Puesto)) {
            return res.status(409).send({
                error: "Ingrese Puesto",
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
        if (CreadoPor == null || /^[\s]*$/.test(CreadoPor)) {
            return res.status(409).send({
                error: "Ingrese CreadoPor",
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
        if (IdDepartamento == null || /^[\s]*$/.test(IdDepartamento)) {
            return res.status(409).send({
                error: "Ingrese Departamento",
            });
        }   
        if (IdRol == null || /^[\s]*$/.test(IdRol)) {
            return res.status(409).send({
                error: "Ingrese Rol",
            });
        }  
         if (IdPerfil == null || /^[\s]*$/.test(IdPerfil)) {
            return res.status(409).send({
                error: "Ingrese Perfil",
            });
        }
        if (IdUResponsable == null || /^[\s]*$/.test(IdUResponsable)) {
            return res.status(409).send({
                error: "Ingrese Unidad Responsable",
            });
        }
        if (Dependencia == null || /^[\s]*$/.test(Dependencia)) {
            return res.status(409).send({
                error: "Ingrese Dependencia",
            });
        }
        
        db.query(`CALL sp_CreaSolicitud('${Nombre}','${APaterno}', '${AMaterno}', '${NombreUsuario}', '${Email}', '${Puesto}', '${Curp}', '${RFC}', '${Celular}', '${Telefono}', '${Extencion}', '${TipoSolicitud}', '${DatosAdicionales}', '${IdApp}','${CreadoPor}','${IdUResponsable}','${IdPerfil}','${IdRol}','${IdDepartamento}','${IdTipoUsuario}','${PuedeFirmar}','${Dependencia}')`, (err, result) => {
                if (err) {
                    
                    return res.status(500).send({
                        error: err,
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
            }
};