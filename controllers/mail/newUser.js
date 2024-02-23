const fs = require("fs");
module.exports = {
  emailTemplate: (mensaje, nombre, usuario, contrasena, userid) => {
    function imageToBase64(filePath) {
      try {
          const imageData = fs.readFileSync(filePath);
          const base64Data = imageData.toString('base64');
          return base64Data;
      } catch (error) {
          console.error('Error al leer el archivo:', error);
          throw error; // O maneja el error de acuerdo a tu lógica
      }
  }
  
    const path = require('path');
    const filePath = path.resolve(__dirname, './Images/Palacio.png');
    console.log(filePath);
    const base64ImageData = imageToBase64(filePath);

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
            height: 100%;
            max-width: 600px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background-color: #f1f1f1;
          }
    
          #container {
            max-height: 100vh;
            max-width: 600px;
            
            display: flex;
            flex-direction: column;
            align-items: center;
          }
    
          #logo {
            width: 100%;
            max-width: 600px;
            height: auto;
          }
    
          h1, h2, h3, h4 {
            font-family: sans-serif;
            text-align: center;
          }
    
          #message {
            border: 1px solid black;
            padding: 10px;
            justify-content: center;
            align-items: center;
          }
    
          #security-tips {
            background-color: #f7fafa;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px;
          }
    
          #access-link {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex-direction: column;
            margin: 10px;
          }
    
          button {
            background-color: rgb(196, 255, 190);
            color: rgb(99, 99, 99);
            border-radius: 1rem;
            border-width: 0.1rem;
            padding: 1vw; /* Ajusta el valor según tu preferencia */
            cursor: pointer;
            font-family: sans-serif;
            width: 100%;
            height: 50px;
          }
        </style>
      </head>
      <body>
        <div id="container">
        <img style="width: 60%; " src='cid:Palacio' />


          <h1>Secretaría de Finanzas y Tesorería General del Estado</h1>
          <h2>Acceso a Usuarios</h2>
          <h3>
            Hola ${nombre}, ${mensaje}
          </h3>
          <div id="message">
            <h4>
              DATOS DE ACCESO
            </h4>
            <div>
              <h4 style="font-family: sans-serif"><strong> Usuario:</strong></h4>
              <h4 style="font-weight: lighter; font-family: sans-serif">
                ${usuario}
              </h4>
            </div>
            <div>
              <h4 style="font-family: sans-serif"><strong> Contraseña:</strong></h4>
              <h4 style="font-weight: lighter; font-family: sans-serif">
                ${contrasena}
              </h4>
            </div>
          </div>
          <div id="security-tips">
            <h3>Consejos importantes de seguridad:</h3>
            <h4
              style="
                font-weight: lighter;
                color: rgb(101, 101, 101);
                text-align: center;
                font-family: sans-serif;
              "
            >
              1. Mantén los datos de tu cuenta en un lugar seguro. <br />
              2. No compartas tus datos de acceso con otras personas. <br />
              3. Cambia tu contraseña regularmente.
            </h4>
          </div>
          <div id="access-link">
            <h4>Accede a la plataforma mediante el siguiente enlace:</h4>
            <a href="${process.env.LOGIN_B_APP_FRONT}">
              <button>
                ACCEDER
              </button>
            </a>
          </div>
        </div>
      </body>
    </html>
    
        `;
  },
};
