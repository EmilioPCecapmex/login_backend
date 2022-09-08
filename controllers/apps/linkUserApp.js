const db = require("../../config/db.js");

module.exports = {
  linkUserApp: (req, res) => {
    const appData = req.body;
    db.query(
      `CALL sp_VinculaUsuarioApp('${appData.IdUsuario}','${appData.IdApp}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        const error = result[0][0].message;

        if (error === undefined) {
          return res.status(201).send({
            msg: "¡Registro exitoso!",
          });
        } else {
          return res.status(409).send({
            warning: error,
          });
        }
      }
    );
  },
  unlinkUserApp: (req, res) => {
    const appData = req.body;
    db.query(
      `CALL sp_DesvinculaUsuarioApp('${appData.IdUsuario}','${appData.IdApp}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }

        const warning = result[0][0].warning;

        if (warning === undefined) {
          return res.status(201).send({
            msg: "¡Registro eliminado con exito!",
          });
        } else {
          return res.status(409).send({
            warning,
          });
        }
      }
    );
  },
  manageUserApps: (req, res) => {
    const appData = req.body;
    const IdUsuario = appData.IdUsuario;
    const Apps = appData.Apps;

    const resArray = [];

    function setValue(value) {
      resArray.push(value);
    }

    const sizeA = Apps.length;

    let i = 1;

    function isUUID(uuid) {
      let s = "" + uuid;

      s = s.match(
        "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
      );
      if (s === null) {
        return false;
      }
      return true;
    }
    if (isUUID(IdUsuario)) {
      Apps.forEach((element) => {
        db.query(
          `CALL sp_VinculaUsuarioApps('${IdUsuario}','${element.IdApp}','${element.Vincular}')`,
          (err, result) => {
            if (err) {
              shouldSkip = true;
              return res.status(409).send({
                error: "Id app invalido",
              });
            }

            const error = result[0][0].message;
            const warning = result[0][0].warning;

            const success = result[0][0].success || result[0][0].Id;

            if (error) {
              setValue(error);
            } else if (warning) {
              setValue(warning);
            } else if (success) {
              setValue("Exito");
            }

            if (i === sizeA) {
              return res.status(200).send({
                result: resArray,
              });
            }

            i++;
          }
        );
      });
    } else {
      return res.status(409).send({
        error: "Id usuario invalido",
      });
    }
  },
};
