const db = require("../../config/db.js");
module.exports = {

createAdminMenu: (req, res) => {
const {Menu,IdApp,Descripcion,Nivel,Orden,MenuPadre,Icon,Path,ControlInterno,IdUsuario} = req.body;
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

deleteAdminMenu:(req,res)=>{
  const {IdMenu,IdUsuario} = req.body;

  let contError=0;
       let error = "Ingrese:";

           if (!IdMenu || (/^[\s]*$/.test(IdMenu)))
           {
               error += " IdMenu,";
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

        db.query(`CALL sp_EliminarMenu(?,?)`,[IdMenu,IdUsuario], (err, result) => {
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

editarMenu:(req, res) =>{
  const { Id, Menu, IdApp, Descripcion, Nivel, Orden, MenuPadre, Icon, Path, ControlInterno, IdUsuario } = req.body;
    
        if (!Id || !Menu || !IdApp || !Descripcion || !Nivel|| !Orden|| !MenuPadre|| !Icon|| !Path || !ControlInterno || !IdUsuario) {
            let error = "Ingrese:";
    
            if (!Id) error += " Id,";
            if (!Menu) error += " Menu,";
            if (!IdApp) error += " IdApp,";
            if (!Descripcion) error += " Descripcion,";
            if (!Nivel) error += " Nivel,";
            if (!Orden) error += " Orden,";
            if (!MenuPadre) error += " MenuPadre,";
            if (!Icon) error += " Icon,";
            if (!Path) error += " Path,";
            if (!ControlInterno) error += " ControlInterno,";
            
            
            if (!IdUsuario) error += " IdUsuario";
        
            // Elimina la última coma si existe
            error = error.endsWith(',') ? error.slice(0, -1) : error;
            //Remplaza la ultima coma por un " y "
            error = error.replace(/,([^,]*)$/, ' y$1');

            return res.status(400).send({
                error: error,
            });
        }
    
        db.query(`CALL sp_EditarMenu(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [Id, Menu, IdApp, Descripcion, Nivel, Orden, MenuPadre, Icon, Path, ControlInterno, IdUsuario], (err, result) => {
            if (err) {
                return res.status(500).send({
                    error: err.sqlMessage,
                });
            }
    
            if (result.length) {
                const data = result[0];
                if (data.ERROR) {
                    return res.status(409).send({
                        error: data.ERROR,
                    });
                } else {
                    return res.status(200).send({
                        data,
                    });
                }
            } else {
                return res.status(409).send({
                    error: "Error al actualizar el menú.",
                });
            }
        });
  }
}
