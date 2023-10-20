const db = require("../../config/db.js");
module.exports = {

createAdminMenu: (req, res) => {
const {Menu,IdApp,Descripcion,Nivel,Orden,MenuPadre,Icon,Path,ControlInterno,IdUsuario} = req.body;
console.log(req.body);
        let contError=0;
        let error = "Ingrese:";

            if (!Menu || (/^[\s]*$/.test(Menu)))
            {
                error += " Menu,";
                contError++;
            } 

            if (!IdUsuario || (/^[\s]*$/.test(IdUsuario)))
            {
                error += " IdUsuario";
                contError++;
            } 
        
            // Elimina la última coma si existe
            error = error.endsWith(',') ? error.slice(0, -1) : error;
            //Remplaza la ultima coma por un " y "
            error = error.replace(/,([^,]*)$/, ' y$1');
    
         if (contError!=0) {
            return res.status(400).send({
                error: error,
            });
         }

        db.query(`CALL sp_CrearMenu(?,?,?,?,?,?,?,?,?,?)`,[Menu,IdApp,Descripcion,Nivel,Orden,MenuPadre,Icon,Path,ControlInterno,IdUsuario], (err, result) => {
         if (err) {
           return res.status(500).send({
             error: err,
           });
         }
   
         if (result.length) {
           const data = result[0];
           return res.status(200).send({
             data,
           });
         } else {
           return res.status(409).send({
             error: "¡Sin Información!",
           });
         }
       });
},

deleteAdminMenu:(req,res)=>{},

getAdminMenu:(req,res)=>{
    const {IdApp} = req.query;

    let contError=0;
         let error = "Ingrese:";
 
             if (!IdApp || (/^[\s]*$/.test(IdApp)))
             {
                 error += " ch_IdApp";
                 contError++;
             } 
         
             // Elimina la última coma si existe
             error = error.endsWith(',') ? error.slice(0, -1) : error;
             //Remplaza la ultima coma por un " y "
             error = error.replace(/,([^,]*)$/, ' y$1');
     
          if (contError!=0) {
             return res.status(400).send({
                 error: error,
             });
          }
 
          db.query(`CALL sp_ListaAdminMenu(?)`,[IdApp], (err, result) => {
             if (err) {
               return res.status(500).send({
                 error: err,
               });
             }
       
             if (result.length) {
               const data = result[0];
               return res.status(200).send({
                 data,
               });
             } else {
               return res.status(409).send({
                 error: "¡Sin Información!",
               });
             }
           });
},

getMenusPadre: (req, res) => {
  const IdApp=req.query.IdApp
  db.query(`CALL sp_ListaMenuPadre('${IdApp}')`, (err, result) => {
      if (err) {
          return res.status(500).send({
          error: "Error: "+err.sqlMessage,
          });
      }
      if (result.length) {
          const data = result[0];
          return res.status(200).send({
          data,
          });
      } else {
          return res.status(409).send({
          error: "¡Sin Información!",
          });
      }
  });
},

}
