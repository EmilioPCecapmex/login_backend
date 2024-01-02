const db = require("../../config/db.js");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const templateSolicitud = path.join(__dirname, '../templates/solicitudDeUsuario.html');


const replaceVariable = (template, variable, value) => {
  console.log("variable:",`{{${variable}}}`);
  const regex = new RegExp(`{{${variable}}}`, "g");
  return template.replace(regex, value);
};

const replaceAllVariables = (template, variables) => {
  let result = template;
  Object.entries(variables).forEach(([variable, value]) => {
    result = replaceVariable(result, variable, value);
  });
  return result;
};

// const headerTemplate = fs.readFileSync(headerFolder, "utf8");
// var header = headerTemplate;

// function callHeader() {
//     const headerImg = (logoTesoreria, escudo) => {
//       const resLogoTesoreria = fs.readFileSync("controllers/stylessheet/images/logotesoreria192.png");


//       header = headerTemplate
//         .replaceAll("{{headerText}}", "Descripcion que yo quiera")
//         .replaceAll(
//           "{{logoTesoreria}}",
//           `data:image/${path
//             .extname(logoTesoreria)
//             .split(".")
//             .pop()};base64,${Buffer.from(resLogoTesoreria, "binary").toString(
//             "base64"
//           )}`
//         )
       
//     };


//     headerImg(
//       "controllers/stylessheet/images/logoTesoreria.png",
//       "controllers/stylessheet/images/escudo.png"
//     );
  
// }

module.exports = {
  getSolicitudUsuario: async (req, res) => {

    let datosSolicitud;
    const htmlTemplate = fs.readFileSync(templateSolicitud, "utf8");
    const resLogoTesoreria = fs.readFileSync("controllers/stylessheet/images/logoTesoreria192.png");
    let html;

    const NombreUsuario = req.query.NombreUsuario;
    
    if (NombreUsuario == null || /^[\s]*$/.test(NombreUsuario)) {
      return res.status(409).send({
        error: "Ingrese NombreUsuario",
      });
    }

    db.query(`CALL sp_UltimaSolicitudUsuario('${NombreUsuario}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        console.log("daots:",result[0][0]);
        datosSolicitud=result[0][0];
        html = replaceAllVariables(htmlTemplate, {...datosSolicitud, }).replaceAll(
          "{{logoTesoreria}}",
          `data:image/${path
            .extname("logoTesoreria")
            .split(".")
            .pop()};base64,${Buffer.from(resLogoTesoreria, "binary").toString(
            "base64"
          )}`
        );
        
      } else {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    });

    const browser = await puppeteer.launch({
      headless: "false",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: false,
      margin: {
        top: "1in",
        bottom: "1in",
        right: "0.50in",
        left: "0.50in",
      },
      l: true,
    });

    await browser.close();

let nombreArchivo = `${datosSolicitud.Nombre} ${datosSolicitud.ApellidoPaterno} - ${datosSolicitud.TipoDeMovimiento} - ${datosSolicitud.AccesoApp}`;
nombreArchivo=nombreArchivo.toUpperCase();
console.log(nombreArchivo);

res.setHeader("Content-Type", "application/pdf");
res.setHeader(
  "Content-Disposition",
  `attachment; filename="${nombreArchivo}.pdf"`
);
res.send(pdfBuffer);

  },
};
