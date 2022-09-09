const jwt = require("jsonwebtoken");
var moment = require("moment-timezone");

module.exports = {
  isLoggedIn: (req, res) => {
    let tokenHeaderKey = process.env.LOGIN_B_APP_TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.LOGIN_B_APP_JWT_SECRET_KEY;

    try {
      const token = req.header(tokenHeaderKey);
      const decoded = jwt.verify(token, jwtSecretKey);

      req.userData = decoded;

      const iatDate = moment(decoded.iat * 1000)
        .tz("America/Monterrey")
        .format();
      const expDate = moment(decoded.exp * 1000)
        .tz("America/Monterrey")
        .format();

      res.status(200).send({
        expDateTime: expDate,
        iatDateTime: iatDate,
        data: decoded,
      });
    } catch (err) {
      return res.status(401).send({
        msg: "Sesión no valida!",
      });
    }
  },

  verifyJWT: (req, res, next) => {
    let tokenHeaderKey = process.env.LOGIN_B_APP_TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.LOGIN_B_APP_JWT_SECRET_KEY;
    const token = req.header(tokenHeaderKey);
    if (!token) {
      res.send("Necesitas un token.");
    } else {
      jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
          res
            .status(401)
            .json({ auth: false, message: "Error de autenticación." });
        } else {
          next();
        }
      });
    }
  },
};
