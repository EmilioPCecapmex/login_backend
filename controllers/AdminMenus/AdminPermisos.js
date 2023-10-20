const db = require("../../config/db.js");
module.exports = {

    getAdminPermiso:(req,res)=>{
        const {IdMenu} = req.query;
    
        let contError=0;
             let error = "Ingrese:";
     
                 if (!IdMenu || (/^[\s]*$/.test(IdMenu)))
                 {
                     error += " ch_IdMenu";
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
     
              db.query(`CALL sp_ListaAdminPermiso(?)`,[IdMenu], (err, result) => {
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

    deleteAdminPermiso:(req,res)=>{},

    createAdminPermiso:(req,res)=>{
        const {Permiso,Descripcion,ControlInterno,IdMenu,IdApp,IdUsuario} = req.body;
        console.log(req.body);
        let contError=0;
        let error = "Ingrese:";

            if (!Permiso || (/^[\s]*$/.test(Permiso)))
            {
                error += " Permisso,";
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

        db.query(`CALL sp_CrearPermiso(?,?,?,?,?,?)`,[Permiso,Descripcion,ControlInterno,IdMenu,IdApp,IdUsuario], (err, result) => {
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

}