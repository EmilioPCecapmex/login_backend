module.exports = {
  emailVinculacionTemplate: (mensaje,nombre, usuario, userid) => {
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
      }

      #container {
        max-height: 100vh;
        max-width: 600px;
        background-color: #f1f1f1;
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
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 10px;
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
        padding: 1%;
        cursor: pointer;
        font-family: sans-serif;
        width: 100%;
        height: 50px;
      }
    </style>
  </head>
  <body>
    <div id="container">
    <a href="controllers/mail/palacio.png" alt="palacio" sizes="(min-width: 600px) 200px, 50vw" id="logo"></a>
      <h1>Secretaría de Finanzas y Tesorería General del Estado</h1>
      <h2>Acceso a Usuarios</h2>
      <h3>
        Hola ${nombre}, ${mensaje}
      </h3>
      <div id="message">
        <h4>
        Sigue iniciando sesión con tus credenciales usando el usuario: <strong>${usuario}</strong>. Una vez dentro, verás las aplicaciones a las que tienes acceso. Haz clic en la aplicación a la que deseas acceder.
        </h4>
      </div>
      <div id="security-tips">
        <h3>Consejos importantes de seguridad:</h3>
        <h4>
          1. Mantén los datos de tu cuenta en un lugar seguro. <br />
          2. No compartas tus datos de acceso con otras personas. <br />
          3. Cambia tu contraseña regularmente.
        </h4>
      </div>
      <div id="access-link">
        <h4>Accede a la plataforma mediante el siguiente enlace:</h4>
        <a href="${process.env.LOGIN_B_APP_FRONT}">
       <button
  style="
    background-color: rgb(196, 255, 190);
    color: rgb(99, 99, 99);
    border-radius: 1rem;
    border-width: .1rem ;
    padding: 1vw; /* Ajusta el valor según tu preferencia */
    cursor: pointer;
    font-family: sans-serif;
    height: 50px;
  "
>
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
