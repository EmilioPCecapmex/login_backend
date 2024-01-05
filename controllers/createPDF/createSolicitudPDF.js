const db = require("../../config/db.js");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const templateSolicitud = path.join(
  __dirname,
  "../templates/solicitudDeUsuario.html"
);

const replaceVariable = (template, variable, value) => {
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
    console.log("entro a la funcion 1");
    let datosSolicitud;
    const htmlTemplate = fs.readFileSync(templateSolicitud, "utf8");
    const resLogoTesoreria = fs.readFileSync(
      "./controllers/stylessheet/images/logoTesoreria192.png"
    );
    let html;

    const NombreUsuario = req.query.NombreUsuario;

    if (NombreUsuario == null || /^[\s]*$/.test(NombreUsuario)) {
      return res.status(409).send({
        error: "Ingrese NombreUsuario",
      });
    }
    console.log("entro a la funcion 2");
    db.query(
      `CALL sp_UltimaSolicitudUsuario('${NombreUsuario}')`,
      async (err, result) => {
        console.log("entro a la funcion 3");
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }

        
        if (result.length) {
          if(result[0]?.length===0){
            return res.status(409).send({
              error: "¡Sin Información!",
            });
          }
          datosSolicitud = result[0][0];
          html = replaceAllVariables(htmlTemplate, {
            ...datosSolicitud,
          }).replaceAll(
            "{{logoTesoreria}}",
            `data:image/${path
              .extname("logoTesoreria")
              .split(".")
              .pop()};base64,${Buffer.from(resLogoTesoreria, "binary").toString(
              "base64"
            )}`
          );


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
      
          let nombreArchivo = `${datosSolicitud?.Nombre} ${datosSolicitud?.ApellidoPaterno} - ${datosSolicitud?.TipoDeMovimiento} - ${datosSolicitud?.AccesoApp}`;
          nombreArchivo = nombreArchivo.toUpperCase();
      
          const headers = {"Content-Disposition": `attachment; filename="${nombreArchivo}"`,
            "Content-Type": "application/pdf",
            
          };
          console.log("entro a la funcion 4");
          res.set(headers);
          res.send(pdfBuffer);
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
    
  },
};
