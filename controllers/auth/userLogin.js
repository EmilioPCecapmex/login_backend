const jwt = require("jsonwebtoken");

const db = require("../../config/db.js");

const bcrypt = require("bcryptjs");

global.tokenList = {};

module.exports = {
  userLogin: (req, res) => {
    const userData = req.body;

    db.query(
      `CALL sp_IniciaSesion('${userData.NombreUsuario}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: err,
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
///////////////////


       


/////////////////////

                const IdUsuario = result[0][0].Id;
                const NombreUsuario = result[0][0].NombreUsuario;
                const datosCompletos = result[0][0];

                let AppIds = result[1];
                let token;

                const user = {
                  NombreUsuario: NombreUsuario,
                  IdUsuario: IdUsuario,
                  // idDepartamento:result[0][0]?.IdDepartamento
                  datosCompletos:datosCompletos
                  // datosCompletos:datosCompletos
                  // datosCompletos:datosCompletos
                };

                token = jwt.sign(user, process.env.LOGIN_B_APP_JWT_SECRET_KEY, {
                  expiresIn: "45m",
                });

                const refreshToken = jwt.sign(
                  user,
                  process.env.LOGIN_B_APP_REFRESH_TOKEN_KEY,
                  { expiresIn: "1440m" }
                );

                db.query(`CALL sp_ActualizaInicioSesion('${IdUsuario}')`);

                const response = {
                  msg: "¡Inicio de sesión exitoso!",
                  AppIds,
                  IdUsuario,
                  token,
                  refreshToken,
                };

                global.tokenList[refreshToken] = response;

                return res.status(200).send(response);
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

  tokenRefresh: (req, res) => {
    
    const userData = req.body;

    let jwtSecretKey = process.env.LOGIN_B_APP_REFRESH_TOKEN_KEY;

    // refresh the damn token
   
    jwt.verify(userData.refreshToken, jwtSecretKey, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ auth: false, message: "Refresh Token Expirado" });
      } else {
        // if refresh token exists
        if (
          userData.refreshToken &&
          userData.refreshToken in global.tokenList
        ) {
          console.log('decode',decoded);
          const user = {
            NombreUsuario: decoded.NombreUsuario,
            IdUsuario: decoded.IdUsuario,
          };
          
          const token = jwt.sign(user, process.env.LOGIN_B_APP_JWT_SECRET_KEY, {
            expiresIn: "45m",
          });
          const response = {
            token: token,
          };
          // update the token in the list
          global.tokenList[userData.refreshToken].token = token;
          res.status(200).json(response);
        } else {
          res.status(404).send("Invalid request");
        }
      }
    });
  },
};
