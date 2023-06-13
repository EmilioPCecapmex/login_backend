const db = require("../../config/db.js");

module.exports = {
  //CREAR
  createSecretaria: (req, res) => {
    const Nombre = req.body.Nombre;
    const NombreCorto = req.body.NombreCorto;
    const IdTitular = req.body.IdTitular;
    const PerteneceA = req.body.PerteneceA;
    const Direccion = req.body.Direccion;
    const CreadoPor = req.body.CreadoPor;   

    if ((NombreCorto == null || /^[\s]*$/.test(NombreCorto)) ) {
      return res.status(409).send({
        error: "Ingrese NombreCorto válido.",
      });
    } 

    if ((Nombre == null || /^[\s]*$/.test(Nombre)) ) {
        return res.status(409).send({
          error: "Ingrese Nombre válido.",
        });
    } 

    if ((IdTitular == null || /^[\s]*$/.test(IdTitular)) ) {
        return res.status(409).send({
          error: "Ingrese IdTitular válido.",
        });
    }

    if ((PerteneceA == null || /^[\s]*$/.test(PerteneceA)) ) {
        return res.status(409).send({
          error: "Ingrese PerteneceA válido.",
        });
    }

    if ((Direccion == null || /^[\s]*$/.test(Direccion)) ) {
        return res.status(409).send({
          error: "Ingrese Direccion válido.",
        });
    }

    if ((CreadoPor == null || /^[\s]*$/.test(CreadoPor)) ) {
        return res.status(409).send({
          error: "Ingrese CreadoPor válido.",
        });
    }
   
      db.query(
        `CALL sp_CrearSecretaria('${Nombre}','${NombreCorto}', '${IdTitular}', '${PerteneceA}', '${Direccion}', '${CreadoPor}' )`,
        (err, result) => {
          if (err) {
            return res.status(500).send({
              error: err.sqlMessage,
            });
          }
          if (result.length) {
            const data = result[0][0];
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
        }
      );
    
  },

  //LISTADO COMPLETO
  getSecretarias: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    console.log(req);
    db.query(`CALL sp_ListaSecretarias('${IdUsuario}')`, (err, result) => {
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

  

  //MODIFICA POR ID
  modifySecretaria: (req, res) => {
    const IdSecretaria = req.body.IdSecretaria;
    const Nombre = req.body.Nombre;
    const NombreCorto = req.body.NombreCorto;
    const IdTitular = req.body.IdTitular;
    const PerteneceA = req.body.PerteneceA;
    const Direccion = req.body.Direccion;
    const IdModificador = req.body.IdModificador;   

    if ((IdSecretaria == null || /^[\s]*$/.test(IdSecretaria)) ) {
        return res.status(409).send({
          error: "Ingrese IdSecretaria válido.",
        });
      } 

    if ((NombreCorto == null || /^[\s]*$/.test(NombreCorto)) ) {
      return res.status(409).send({
        error: "Ingrese NombreCorto válido.",
      });
    } 

    if ((Nombre == null || /^[\s]*$/.test(Nombre)) ) {
        return res.status(409).send({
          error: "Ingrese Nombre válido.",
        });
    } 

    if ((IdTitular == null || /^[\s]*$/.test(IdTitular)) ) {
        return res.status(409).send({
          error: "Ingrese IdTitular válido.",
        });
    }

    if ((PerteneceA == null || /^[\s]*$/.test(PerteneceA)) ) {
        return res.status(409).send({
          error: "Ingrese PerteneceA válido.",
        });
    }

    if ((Direccion == null || /^[\s]*$/.test(Direccion)) ) {
        return res.status(409).send({
          error: "Ingrese Direccion válido.",
        });
    }

    if ((IdModificador == null || /^[\s]*$/.test(IdModificador)) ) {
        return res.status(409).send({
          error: "Ingrese IdModificador válido.",
        });
    }

      db.query(
        `CALL sp_ModificaSecretaria('${IdSecretaria}','${Nombre}','${NombreCorto}','${IdTitular}','${PerteneceA}','${Direccion}','${IdModificador}')`,
        (err, result) => {
          if (err) {
            return res.status(500).send({
              error: err.sqlMessage,
            });
          }
          if (result.length) {
            const data = result[0][0];
            if (data.error) {
              return res.status(409).send({
                result: data,
              });
            }
            return res.status(200).send({
              result: data,
            });
          } else {
            return res.status(409).send({
              error: "¡Sin Información!",
            });
          }
        }
      );
    
  },

  
};