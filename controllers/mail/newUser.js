module.exports = {
  emailTemplate: (mensaje,nombre, usuario, contrasena, userid) => {
    return `
    <!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" />
    <title>SFyTGE</title>
  </head>
  <body
    style="
      height: 120%;
      max-width: 600px;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      
    "
  >
    <div
      style="
        max-height: 100vh;
        max-width: 600px;
        background-color: #f1f1f1;
        displa:flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <a href="./palacio.png" alt="palacio" sizes="(min-width: 600px) 200px, 50vw"> </a>
      <h1 style="font-family: sans-serif; text-align: center;">Secretaría de Finanzas y Tesorería General del Estado</h1>
      <h2 style="font-family: sans-serif">Acceso a Usuarios</h2>
      <h3 style="text-align: center; font-family: sans-serif">
        Hola ${nombre}, ${mensaje}
      </h3>
      <div
        style="
          border: 1px solid black;
          padding: 10px;
          justify-content: center;
          align-items: center;
        "
      >
      <div style ="
      display 
      justify-items: center;
      align-items: center;
      ">
      <h4 font-family: sans-serif">
          DATOS DE ACCESO
        </h4>
      </div>

      <div>
      <h4 style="font-family: sans-serif"><strong> Usuario:</strong></h4>
      </div>

      <div>
        <h4 style="font-weight: lighter; font-family: sans-serif">
          ${usuario}
        </h4>
      </div>

      <div>
      <h4 style="font-family: sans-serif"><strong> Contraseña:</strong></h4>
      </div>

      <div>
        <h4 style="font-weight: lighter; font-family: sans-serif">
          ${contrasena}
        </h4>
      </div>
        

        
        
      </div>
      <div
        style="
         display:flex;
          background-color: #f7fafa;
          width: 100%;
          flex-direction: column;
          align-items: center;
        "
      >
        <h3 style="font-family: sans-serif">
          Consejos importantes de seguridad:
        </h3>
        <h4
          style="
            font-weight: lighter;
            color: rgb(101, 101, 101);
            text-align: center;
            font-family: sans-serif;
          "
        >
          1.Mantén los datos de tu cuenta en un lugar seguro. <br />
          2.No compartas tus datos de acceso con otras personas. <br />
          3.Cambia tu contraseña regularmente.
        </h4>
        
      </div>



      <div style="
      display:flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      flex-direction: column;
    "
    >
    <h4 style="font-family: sans-serif">
          Accede a la plataforma mediante el siguiente enlace:
        </h4>
      <a href=${process.env.LOGIN_B_APP_FRONT} style="
        align-items: center;
        text-align: center;
        display:flex;
        justify-content:center;
        width:50%;
        heigth:50px;
      "> 
        <button
        
          style="
            background-color: rgb(196, 255, 190);
            color: rgb(99, 99, 99);
            border-radius: 1rem;
            border-width: .1rem ;
            padding: 1%;
            cursor: pointer;
            font-family: sans-serif;
            width:100%;
            heigth:50px;
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
