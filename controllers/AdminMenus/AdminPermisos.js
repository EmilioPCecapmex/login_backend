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

    deleteAdminPermiso:(req,res)=>{
      const {IdPermiso,IdUsuario} = req.body;

   let contError=0;
        let error = "Ingrese:";

            if (!IdPermiso || (/^[\s]*$/.test(IdPermiso)))
            {
                error += " IdPermiso,";
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

         db.query(`CALL sp_EliminarPermiso(?,?)`,[IdPermiso,IdUsuario], (err, result) => {
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

    createAdminPermiso:(req,res)=>{
        const {Permiso,Descripcion,ControlInterno,IdMenu,IdApp,IdUsuario} = req.body;
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

    
  editarPermiso:(req, res) =>{
  const { Id, Permiso, Descripcion, ControlInterno, idMenu, IdApp, IdUsuario } = req.body;
    
        if (!Id || !Permiso || !Descripcion || !ControlInterno || !idMenu || !IdApp || !IdUsuario) {
            let error = "Ingrese:";
    
            if (!Id) error += " Id,";
            if (!Permiso) error += " Permiso,";
            if (!Descripcion) error += " Descripcion,";
            if (!ControlInterno) error += " ControlInterno,";
            if (!idMenu) error += " idMenu,";
            if (!IdApp) error += " IdApp,";
            if (!IdUsuario) error += " IdUsuario";
        
            // Elimina la última coma si existe
            error = error.endsWith(',') ? error.slice(0, -1) : error;
            //Remplaza la ultima coma por un " y "
            error = error.replace(/,([^,]*)$/, ' y$1');

            return res.status(400).send({
                error: error,
            });
        }
    
        db.query(`CALL sp_EditarPermiso(?, ?, ?, ?, ?, ?, ?)`, [Id, Permiso, Descripcion, ControlInterno, idMenu, IdApp, IdUsuario], (err, result) => {
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
                    error: "Error al actualizar el permiso.",
                });
            }
        });
  }


}