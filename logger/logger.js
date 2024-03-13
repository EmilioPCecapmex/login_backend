const fs = require('fs');
const path = require('path');


// comentario para acutalizar
function obtenerFechaActual() {
    const fecha = new Date();
    return fecha.toLocaleString();
  }
  
function escribirRegistro(mensaje) {
    const archivoRegistro = path.join(__dirname, 'historialEnviosEmail.txt');
    const mensajeConFecha = `[${obtenerFechaActual()}] ${mensaje}\n`;
  
    fs.appendFile(archivoRegistro, mensajeConFecha, (error) => {
      if (error) {
        console.error('Error al escribir en el archivo de registro:', error);
      } else {
        console.log('Registro actualizado correctamente.');
      }
    });
  }

  module.exports = {
    escribirRegistro: escribirRegistro,
  };
  