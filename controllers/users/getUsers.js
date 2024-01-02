const db = require("../../config/db.js");
const util = require("util");
module.exports = {
  getUserEmailRolControlInterno: (req, res) => {
    const IdApp= req.body.IdApp;
    const ControlesInternos = JSON.stringify(req.body.ControlesInternos);
    db.query(`CALL sp_ObtenerCorreoPorRolControlInterno(?,?)`,[ControlesInternos,IdApp], (err, result) => {
      console.log(req.body);
      console.log("err",err);
      console.log("result",result);
      if (err) {
        return res.status(500).send({
          error: err,
        });
      }
      if (result.length) {
        const data = result[0];
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

  getUserDetail: (req, res) => {
    const userId = req.body.IdUsuario;
    db.query(`CALL sp_DetalleUsuario('${userId}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: err,
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

  getUsuariosRoles: (req, res) => {
    const { ControlInterno, idApp } = req.body;

    if (!ControlInterno || !idApp) {
      return res.status(400).send({
        error: "Los parámetros idRol e idApp son requeridos.",
      });
    }

    db.query(
      `CALL sp_ListaUsuariosRol(?, ?)`,
      [ControlInterno, idApp],
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: err.sqlMessage,
          });
        }

        if (result[0] && result[0].length) {
          return res.status(200).send({
            data: result[0],
          });
        } else {
          return res.status(404).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },

  getUserPermissionsDetail: (req, res) => {
    const userId = req.body.IdUsuario;
    const menuControlInterno = req.body.ControlInternoMenu;

    // Usamos un template string para insertar variables directamente en el query
    const queryString = `CALL sp_DetalleUsuarioPermisos('${userId}', '${menuControlInterno}')`;

    db.query(queryString, (err, result) => {
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
    console.log(req.body);
    const userId = req.body.IdUsuario;
    const appId = req.body.IdApp;
    if (userId == null || /^[\s]*$/.test(userId)) {
      return res.status(409).send({
        error: "Ingrese userId válido.",
      });
    }
    if (appId == null || /^[\s]*$/.test(appId)) {
      return res.status(409).send({
        error: "Ingrese appId válido.",
      });
    }

    //  let perfiles=getPerfil(userId,appId);
    let entidades = getUsuarioEntidad(userId, appId);
    let roles = getRoles(userId, appId);
    let menus = await getMenus(userId, appId);
    let permisos = getPermisos(userId, appId);

    db.query(
      `CALL sp_DetalleUsuarioAplicacion('${userId}','${appId}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: err.sqlMessage,
          });
        }
        if (result.length) {
          const data = result[0][0];
          if (data === undefined || data.Error) {
            return res.status(409).send({
              error: "¡Sin Información!",
            });
          }
          return res.status(200).send({
            data: data,
            // perfiles:perfiles,
            entidades: entidades,
            roles: roles,
            menus: menus,
            permisos: permisos,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },
};

// function getPerfil (userId,appId)  {
//   let perfiles =[];
//   let query= `  SELECT
//   p.Id,
//   p.Descripcion,
//   p.Referencia
//   FROM
//   TiCentral.UsuarioPerfil up
//   LEFT join TiCentral.Perfiles p ON up.idPerfil = p.Id
//   LEFT JOIN TiCentral.Usuarios u ON u.Id = up.idusuario
//   WHERE 1=1
//   and u.id=?
//   AND p.IdApp=? `;

//    db.query(query,[userId,appId] ,(err, result) => {
//      if (err) {
//        return res.status(500).send({
//          error: err.sqlMessage,
//        });
//      }

//      if (result.length) {
//        perfiles.push(result);
//      } else {
//       perfiles =[];
//      }
//    });

//    return perfiles;

//  }
function getUsuarioEntidad(idUsuario, idApp) {
  let data = [];
  db.query(
    `CALL sp_ListaUsuarioEntidades(?, ?)`,
    [idUsuario, idApp],
    (err, result) => {
      if (err) {
        return res.status(500).send({
          error: err.sqlMessage,
        });
      }

      if (result.length) {
        data.push(result[0]);
      } else {
        data = [];
      }
    }
  );
  return data;
}

function getRoles(userId, appId) {
  let data = [];
  let query = `   SELECT
  rol.Id,
  rol.Nombre,
  rol.Descripcion,
  rol.ControlInterno
  FROM
  TiCentral.Usuarios us
  LEFT JOIN TiCentral.UsuarioRol ur ON us.id = ur.idUsuario
  LEFT JOIN TiCentral.Roles rol ON ur.idRol = rol.id
  WHERE us.Id =? 
  AND rol.IdApp =?`;

  db.query(query, [userId, appId], (err, result) => {
    if (err) {
      return res.status(500).send({
        error: err.sqlMessage,
      });
    }

    if (result.length) {
      data.push(result);
    } else {
      data = [];
    }
  });

  return data;
}

async function getMenus(userId, appId) {
  const queryAsync = util.promisify(db.query).bind(db);

  let data = [];
  let menus = [];
  let menussub2 = [];
  let query = `  
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
  and m.Deleted=0
  order by m.Orden;
  `;

  const result = await queryAsync(query, [userId, appId]);

  if (result.length > 0) {
    for (var i = 0; i < result.length; i++) {
      const children = await getMenusnivel1(userId, appId, result[i].Id);

      for (var j = 0; j < children.length; j++) {
        const children2 = await getMenusnivel2(userId, appId, children[j].Id);
        obj = {
          Id: children[j].Id,
          FechaDeCreacion: children[j].FechaDeCreacion,
          UltimaModificacion: children[j].UltimaModificacion,
          CreadoPor: children[j].CreadoPor,
          ModificadoPor: children[j].ModificadoPor,
          Deleted: children[j].Deleted,
          Menu: children[j].Menu,
          Descripcion: children[j].Descripcion,
          MenuPadre: children[j].MenuPadre,
          Icon: children[j].Icon,
          Path: children[j].Path,
          Nivel: children[j].Nivel,
          Orden: children[j].Orden,
          ControlInterno: children[j].ControlInterno,
          IdApp: children[j].IdApp,
          item: children2,
        };
        menussub2.push(obj);
      }

      obj = {
        Id: result[i].Id,
        FechaDeCreacion: result[i].FechaDeCreacion,
        UltimaModificacion: result[i].UltimaModificacion,
        CreadoPor: result[i].CreadoPor,
        ModificadoPor: result[i].ModificadoPor,
        Deleted: result[i].Deleted,
        Menu: result[i].Menu,
        Descripcion: result[i].Descripcion,
        MenuPadre: result[i].MenuPadre,
        Icon: result[i].Icon,
        Path: result[i].Path,
        Nivel: result[i].Nivel,
        Orden: result[i].Orden,
        ControlInterno: result[i].ControlInterno,
        IdApp: result[i].IdApp,
        item: menussub2,
      };
      menus.push(obj);
      menussub2 = [];
    }

    data.push(menus);
  }

  return data;
}

async function getMenusnivel1(userId, appId, menuPadre) {
  const queryAsync = util.promisify(db.query).bind(db);
  let query = `  
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
  and m.Deleted=0
  order by m.Orden
  `;

  const result = await queryAsync(query, [userId, appId, menuPadre]);
  return result;
}

async function getMenusnivel2(userId, appId, menuPadre) {
  const queryAsync = util.promisify(db.query).bind(db);
  let query = `  
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
  and m.Deleted=0
  order by m.Orden
  `;
  const result = await queryAsync(query, [userId, appId, menuPadre]);
  return result;
}

function getPermisos(userId, appId) {
  let data = [];
  let query = `  SELECT
  per.ControlInterno,
  men.ControlInterno menu
  FROM
  TiCentral.Usuarios us
  INNER JOIN TiCentral.UsuarioRol ur ON us.Id = ur.IdUsuario
  INNER JOIN TiCentral.Roles rol ON ur.IdRol  = rol.Id
  INNER JOIN TiCentral.RolMenus rm ON rm.IdRol = rol.Id
  INNER JOIN TiCentral.Menus  men ON men.Id = rm.IdMenu
  INNER JOIN TiCentral.MenuPermisos rmenp ON  rmenp.IdMenu = rm.IdMenu and rmenp.IdRol=rol.Id
  INNER JOIN TiCentral.Permisos per ON per.Id = rmenp.IdPermiso
  WHERE
  us.Id=?
  and rol.IdApp =?
  `;

  db.query(query, [userId, appId], (err, result) => {
    if (err) {
      return res.status(500).send({
        error: err.sqlMessage,
      });
    }

    if (result.length) {
      data.push(result);
    } else {
      data = [];
    }
  });

  return data;
}


