const fs = require("fs");
module.exports = {
  emailTemplate: (mensaje, nombre, usuario, contrasena, userid) => {
    return `
    <!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SFyTGE</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f1f1;
      font-family: sans-serif;
    }

    #container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      box-sizing: border-box;
      text-align: center;
      border: 1px solid #000; /* Ahora el borde rodea el contenido del contenedor */
    }

    #logo {
      width: 60%;
      max-width: 100%;
      height: auto;
      margin-bottom: 20px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    h1,
    h2,
    h3,
    h4 {
      text-align: center;
      margin-bottom: 10px;
    }

    #message {
      border: 1px solid #000;
      padding: 10px;
      text-align: center;
    }

    #security-tips {
      background-color: #f7fafa;
      padding: 10px;
      margin: 10px 0;
      text-align: center;
    }

    #access-link {
      margin: 10px 0;
      text-align: center;
    }

    button {
      background-color: #c4ffbe;
      color: #636363;
      border-radius: 1rem;
      border: 0.1rem solid #000;
      padding: 10px;
      cursor: pointer;
      font-family: sans-serif;
      max-width: 200px;
      margin: 0 auto;
      display: block;
    }
  </style>
</head>

<body>
  <div id="container">
    <img id="logo" src='cid:Palacio' />

    <h1>Secretaría de Finanzas y Tesorería General del Estado</h1>
    <h2>Acceso a Usuarios</h2>
    <h3>
      Hola ${nombre}, ${mensaje}
    </h3>

    <div id="message">
      <h4>DATOS DE ACCESO</h4>
      <div>
        <strong>Usuario:</strong>
        ${usuario}
      </div>
      <div>
        <strong>Contraseña:</strong>
        ${contrasena}
      </div>
    </div>

    <div id="security-tips">
      <h3>Consejos importantes de seguridad:</h3>
      <p>
        1. Mantén los datos de tu cuenta en un lugar seguro. <br />
        2. No compartas tus datos de acceso con otras personas. <br />
        3. Cambia tu contraseña regularmente.
      </p>
    </div>

    <div id="access-link">
      <h4>Accede a la plataforma mediante el siguiente enlace:</h4>
      <button>
        <a href="${process.env.LOGIN_B_APP_FRONT}" style="text-decoration: none;">
          ACCEDER
        </a>
      </button>
    </div>
  </div>
</body>

</html>

    
    `;
  },
};
