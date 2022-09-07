const jwt = require("jsonwebtoken");

const db = require("../../config/db.js");

const bcrypt = require("bcryptjs");

module.exports = {
  userLogin: (req, res) => {
    const userData = req.body;

    db.query(
      `CALL sp_IniciaSesion('${userData.NombreUsuario}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }

        let Message = "";

        if (!result.length) {
          return res.status(401).send({
            type: "user",
            msg: "¡Usuario no existe!",
          });
        } else {
          Message = result[0][0].Msg;
        }
        if (Message == undefined) {
          // check password
          bcrypt.compare(
            req.body.Contrasena,
            result[0][0].Contrasena,
            (bErr, bResult) => {
              // wrong password
              if (err) {
                return res.status(401).send({
                  error: "Contraseña Incorrecta",
                });
              }

              if (bResult) {
                const IdUsuario = result[0][0].Id;
                const NombreUsuario = result[0][0].NombreUsuario;
                const CorreoElectronico = result[0][0].CorreoElectronico;
                let AppIds = result[1];
                let token;

                token = jwt.sign(
                  {
                    NombreUsuario: NombreUsuario,
                    IdUsuario: IdUsuario,
                    IdApps: AppIds,
                  },
                  process.env.LOGIN_B_APP_JWT_SECRET_KEY,
                  {
                    expiresIn: "45m",
                  }
                );

                db.query(`CALL sp_ActualizaInicioSesion('${IdUsuario}')`);

                return res.status(200).send({
                  msg: "¡Inicio de sesión exitoso!",
                  AppIds,
                  IdUsuario,
                  token,
                });
              }
              return res.status(401).send({
                type: "password",
                msg: "Contraseña incorrecta.",
              });
            }
          );
        } else {
          return res.status(401).send({
            type: "ActivarUsuario",
            msg: Message,
          });
        }
      }
    );
  },
};
