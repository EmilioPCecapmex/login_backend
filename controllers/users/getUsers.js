const db = require("../../config/db.js");
const util = require('util');
module.exports = {
  getUserDetail: (req, res) => {
    const userId = req.body.IdUsuario;
    db.query(`CALL sp_DetalleUsuario('${userId}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0][0];
        if (data === undefined) {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
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
  
  getUsersInfo: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    db.query(`CALL sp_ListaUsuarios('${IdUsuario}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
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

  getUserAppDetail: async (req, res) => {
    const userId = req.body.IdUsuario;
    const appId = req.body.IdApp;
    if ((userId == null || /^[\s]*$/.test(userId)) ) {
      return res.status(409).send({
        error: "Ingrese userId valido.",
      });
    }  if ((appId == null || /^[\s]*$/.test(appId)) ) {
      return res.status(409).send({
        error: "Ingrese appId valido.",
      });
    } 

   let perfiles=getPerfil(userId,appId);
   let roles =getRoles(userId,appId);
   let menus = await getMenus(userId,appId);
   let permisos = getPermisos(userId,appId);

    db.query(`CALL sp_DetalleUsuarioAplicacion('${userId}','${appId}')`, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          error: err.sqlMessage,
        });
      }
      if (result.length) {
        const data = result[0][0];
        if (data === undefined ||data.Error ) {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }

        
        return res.status(200).send({
          
            data:data,
            perfiles:perfiles,
            roles:roles,
            menus:menus,
            permisos:permisos
          
        });


      } else {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    });
  },


};



function getPerfil (userId,appId)  {
  let perfiles =[];
  let query= `  SELECT
  p.Descripcion,
  p.Referencia
  FROM
  TiCentral.UsuarioPerfil up 
  LEFT join TiCentral.Perfiles p ON up.idPerfil = p.Id
  LEFT JOIN TiCentral.Usuarios u ON u.Id = up.idusuario
  WHERE 1=1
  and u.id=?
  AND p.IdApp=? `;

   db.query(query,[userId,appId] ,(err, result) => {
     if (err) {
      // console.log(err);
       return res.status(500).send({
         error: err.sqlMessage,
       });
     }

     if (result.length) {
     //  console.log(result);
       perfiles.push(result);
     } else {
      perfiles =[];
     }
   });


   return perfiles;

 }


 
function getRoles (userId,appId)  {
  let data =[];
  let query= `   SELECT
  rol.Nombre,
  rol.Descripcion
  FROM
  TiCentral.Usuarios us
  LEFT JOIN TiCentral.UsuarioRol ur ON us.id = ur.idUsuario
  LEFT JOIN TiCentral.Roles rol ON ur.idRol = rol.id
  WHERE us.Id =? 
  AND rol.IdApp =?`;

   db.query(query,[userId,appId] ,(err, result) => {
     if (err) {
     //  console.log(err);
       return res.status(500).send({
         error: err.sqlMessage,
       });
     }

     if (result.length) {
      // console.log(result);
       data.push(result);
     } else {
      data =[];
     }
   });


   return data;

 }


async function getMenus (userId,appId)  {

  const queryAsync = util.promisify(db.query).bind(db);

  let  data =[];
  let menus=[];
  let menussub2=[];
  let query= `  
  SELECT distinct m.* FROM
  TiCentral.Usuarios us
  LEFT JOIN TiCentral.UsuarioRol ur ON ur.idUsuario = us.id
  LEFT JOIN TiCentral.Roles rol ON rol.id = ur.idRol
  LEFT JOIN TiCentral.RolMenus rm ON rm.idRol = rol.id
  LEFT JOIN TiCentral.Menus m ON m.id = rm.idMenu
  WHERE
  m.nivel=0
  and us.id=?
  and rol.IdApp =?
  order by m.Orden;
  `;


  const result = await queryAsync(query,[userId,appId]);
 

  if (result.length > 0 ) {
   
    for(var i = 0; i <result.length;i++){
    
     const children =   await  getMenusnivel1(userId,appId,result[i].Id);

     console.log("buscanndo a nivel 2")
     for(var j = 0; j <children.length;j++){
    
     const children2 =   await  getMenusnivel2(userId,appId,children[j].Id);
     obj ={
      Id                 : children[j].Id,
      FechaDeCreacion    : children[j].FechaDeCreacion,
      UltimaModificacion : children[j].UltimaModificacion,
      CreadoPor          : children[j].CreadoPor,
      ModificadoPor      : children[j].ModificadoPor,
      Deleted            : children[j].Deleted,
      Menu               : children[j].Menu,
      Descripcion        : children[j].Descripcion,
      MenuPadre          : children[j].MenuPadre,
      Icon               : children[j].Icon,
      Path               : children[j].Path,
      Nivel              : children[j].Nivel,
      Orden              : children[j].Orden,
      ControlInterno     : children[j].ControlInterno,
      IdApp              : children[j].IdApp,
      item               : children2
                            
     }
     menussub2.push(obj)
    
     }

     obj ={
      Id                 : result[i].Id,
      FechaDeCreacion    : result[i].FechaDeCreacion,
      UltimaModificacion : result[i].UltimaModificacion,
      CreadoPor          : result[i].CreadoPor,
      ModificadoPor      : result[i].ModificadoPor,
      Deleted            : result[i].Deleted,
      Menu               : result[i].Menu,
      Descripcion        : result[i].Descripcion,
      MenuPadre          : result[i].MenuPadre,
      Icon               : result[i].Icon,
      Path               : result[i].Path,
      Nivel              : result[i].Nivel,
      Orden              : result[i].Orden,
      ControlInterno     : result[i].ControlInterno,
      IdApp              : result[i].IdApp,
      item               : menussub2
                            
     }
         menus.push(obj) ;
         menussub2=[];
    }

    data.push(menus);
  
  }

   return data;
 }

 async function getMenusnivel1(userId,appId,menuPadre)  {
  const queryAsync = util.promisify(db.query).bind(db);
  let query= `  
  SELECT distinct m.* FROM
  TiCentral.Usuarios us
  INNER JOIN TiCentral.UsuarioRol ur ON ur.idUsuario = us.id
  INNER JOIN TiCentral.Roles rol ON rol.id = ur.idRol
  INNER JOIN TiCentral.RolMenus rm ON rm.idRol = rol.id
  INNER JOIN TiCentral.Menus m ON m.id = rm.idMenu
  WHERE
  m.nivel=1
  and us.id=? 
  and rol.IdApp =?
  AND m.MenuPadre =?
  order by m.Orden
  `;

  const result = await queryAsync(query,[userId,appId,menuPadre]);
   return result;

 }

 async function getMenusnivel2(userId,appId,menuPadre)  {
  const queryAsync = util.promisify(db.query).bind(db);
  let query= `  
  SELECT distinct m.* FROM
  TiCentral.Usuarios us
  INNER JOIN TiCentral.UsuarioRol ur ON ur.idUsuario = us.id
  INNER JOIN TiCentral.Roles rol ON rol.id = ur.idRol
  INNER JOIN TiCentral.RolMenus rm ON rm.idRol = rol.id
  INNER JOIN TiCentral.Menus m ON m.id = rm.idMenu
  WHERE
  m.nivel=2
  and us.id=? 
  and rol.IdApp =?
  AND m.MenuPadre =?
  order by m.Orden
  `;
  const result = await queryAsync(query,[userId,appId,menuPadre]);
  return result;

 }

 function getPermisos (userId,appId)  {
  let data =[];
  let query= `  SELECT
  men.ControlInterno,
  per.Referencia,
  men.Menu
  FROM
  TiCentral.Usuarios us
  INNER JOIN TiCentral.UsuarioRol ur ON us.id = ur.idUsuario
  INNER JOIN TiCentral.Roles rol ON ur.idRol  = rol.id
  INNER JOIN TiCentral.RolMenus rm ON rm.idRol = rol.id
  INNER JOIN TiCentral.Menus  men ON men.id = rm.idMenu
  INNER JOIN TiCentral.MenuPermisos rmenp ON  rmenp.idMenu = rm.idMenu and rmenp.idRol=rol.id
  INNER JOIN TiCentral.Permisos per ON per.id = rmenp.idPermiso
  WHERE 1=1
  and us.id=?
  and rol.IdApp =?
  `;

   db.query(query,[userId,appId] ,(err, result) => {
     if (err) {
    //   console.log(err);
       return res.status(500).send({
         error: err.sqlMessage,
       });
     }

     if (result.length) {
    //   console.log(result);
       data.push(result);
     } else {
      data =[];
     }
   });


   return data;

 }


 