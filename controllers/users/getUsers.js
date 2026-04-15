const db = require("../../config/db.js");
const util = require("util");

const queryAsync = util.promisify(db.query).bind(db);

module.exports = {
  getUserEmailRolControlInterno: (req, res) => {
    const IdApp = req.body.IdApp;
    const ControlesInternos = JSON.stringify(req.body.ControlesInternos);

    db.query(
      `CALL sp_ObtenerCorreoPorRolControlInterno(?,?)`,
      [ControlesInternos, IdApp],
      (err, result) => {
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
        }

        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    );
  },

  getUserDetail: (req, res) => {
    const userId = req.body.IdUsuario;

    db.query(`CALL sp_DetalleUsuario(?)`, [userId], (err, result) => {
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
      }

      return res.status(409).send({
        error: "¡Sin Información!",
      });
    });
  },

  getUsersInfo: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    const IdApp = req.query.IdApp;

    db.query(`CALL sp_ListaUsuarios(?, ?)`, [IdUsuario, IdApp], (err, result) => {
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
      }

      return res.status(409).send({
        error: "¡Sin Información!",
      });
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
        }

        return res.status(404).send({
          error: "¡Sin Información!",
        });
      }
    );
  },

  getUserPermissionsDetail: (req, res) => {
    const userId = req.body.IdUsuario;
    const menuControlInterno = req.body.ControlInternoMenu;

    db.query(
      `CALL sp_DetalleUsuarioPermisos(?, ?)`,
      [userId, menuControlInterno],
      (err, result) => {
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
        }

        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    );
  },

  getUserAppDetail: async (req, res) => {
    try {
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

      const [entidades, roles, menus, permisos, result] = await Promise.all([
        getUsuarioEntidad(userId, appId),
        getRoles(userId, appId),
        getMenus(userId, appId),
        getPermisos(userId, appId),
        queryAsync(`CALL sp_DetalleUsuarioAplicacion(?, ?)`, [userId, appId]),
      ]);

      if (!result || !result.length || !result[0] || !result[0].length) {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }

      const data = result[0][0];

      if (data === undefined || data.Error) {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }

      if (
        data.Respuesta === "500" ||
        data.Respuesta === 500 ||
        (data.Respuesta && String(data.Respuesta) !== "200")
      ) {
        return res.status(500).send({
          data,
          entidades,
          roles,
          menus,
          permisos,
        });
      }

      return res.status(200).send({
        data,
        entidades,
        roles,
        menus,
        permisos,
      });
    } catch (err) {
      return res.status(500).send({
        error: err.sqlMessage || err.message || "Error interno del servidor.",
      });
    }
  },

  getActividadUser: async (req, res) => {
    const { fecha, fechaFinal } = req.query;

    if (fecha == null || /^[\s]*$/.test(fecha)) {
      return res.status(409).send({
        error: "Ingrese fecha válido.",
      });
    }

    if (fechaFinal == null || /^[\s]*$/.test(fechaFinal)) {
      return res.status(409).send({
        error: "Ingrese fechaFinal válido.",
      });
    }

    let fechaInicio = fecha;
    let fechaFin = fechaFinal;

    if (fechaFinal < fecha) {
      fechaInicio = fechaFinal;
      fechaFin = fecha;
    }

    console.log("fechaInicio", fechaInicio);
    console.log("fechaFin", fechaFin);

    db.query(
      `CALL sp_ListaActividadUsuarios(?,?)`,
      [fechaInicio, fechaFin],
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: err.sqlMessage,
          });
        }

        if (result.length) {
          const data = result[0];
          if (data === undefined || data.Error) {
            return res.status(409).send({
              error: "¡Sin Información!",
            });
          }

          return res.status(200).send({
            data,
          });
        }

        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    );
  },
};

async function getUsuarioEntidad(idUsuario, idApp) {
  try {
    const result = await queryAsync(`CALL sp_ListaUsuarioEntidades(?, ?)`, [
      idUsuario,
      idApp,
    ]);

    if (result.length) {
      return [result[0]];
    }

    return [];
  } catch (err) {
    return [];
  }
}

async function getRoles(userId, appId) {
  try {
    const query = `
      SELECT DISTINCT
        rol.Id,
        rol.Nombre,
        rol.Descripcion,
        rol.ControlInterno
      FROM TiCentral.UsuarioRol ur
      INNER JOIN TiCentral.Roles rol
        ON ur.IdRol = rol.Id
      WHERE ur.IdUsuario = ?
        AND rol.IdApp = ?
        AND IFNULL(ur.Deleted, 0) = 0
        AND IFNULL(rol.Deleted, 0) = 0
    `;

    const result = await queryAsync(query, [userId, appId]);

    if (result.length) {
      return [result];
    }

    return [];
  } catch (err) {
    return [];
  }
}

async function getMenus(userId, appId) {
  try {
    const query = `
      SELECT DISTINCT
        m.Id,
        m.FechaDeCreacion,
        m.UltimaModificacion,
        m.CreadoPor,
        m.ModificadoPor,
        m.Deleted,
        m.Menu,
        m.Descripcion,
        m.MenuPadre,
        m.Icon,
        m.Path,
        m.Nivel,
        m.Orden,
        m.ControlInterno,
        m.IdApp
      FROM TiCentral.UsuarioRol ur
      INNER JOIN TiCentral.Roles rol
        ON rol.Id = ur.IdRol
      INNER JOIN TiCentral.RolMenus rm
        ON rm.IdRol = rol.Id
      INNER JOIN TiCentral.Menus m
        ON m.Id = rm.IdMenu
      WHERE ur.IdUsuario = ?
        AND rol.IdApp = ?
        AND IFNULL(ur.Deleted, 0) = 0
        AND IFNULL(rol.Deleted, 0) = 0
        AND IFNULL(rm.Deleted, 0) = 0
        AND IFNULL(m.Deleted, 0) = 0
      ORDER BY m.Nivel, m.Orden, m.Menu
    `;

    const rows = await queryAsync(query, [userId, appId]);

    if (!rows.length) {
      return [];
    }

    const byId = new Map();

    for (const row of rows) {
      byId.set(row.Id, {
        Id: row.Id,
        FechaDeCreacion: row.FechaDeCreacion,
        UltimaModificacion: row.UltimaModificacion,
        CreadoPor: row.CreadoPor,
        ModificadoPor: row.ModificadoPor,
        Deleted: row.Deleted,
        Menu: row.Menu,
        Descripcion: row.Descripcion,
        MenuPadre: row.MenuPadre,
        Icon: row.Icon,
        Path: row.Path,
        Nivel: row.Nivel,
        Orden: row.Orden,
        ControlInterno: row.ControlInterno,
        IdApp: row.IdApp,
        item: [],
      });
    }

    const roots = [];

    for (const row of rows) {
      const node = byId.get(row.Id);

      if (!row.MenuPadre || Number(row.Nivel) === 0) {
        roots.push(node);
        continue;
      }

      const parent = byId.get(row.MenuPadre);
      if (parent) {
        parent.item.push(node);
      }
    }

    return [roots];
  } catch (err) {
    return [];
  }
}

async function getPermisos(userId, appId) {
  try {
    const query = `
      SELECT DISTINCT
        per.ControlInterno,
        men.ControlInterno AS menu
      FROM TiCentral.UsuarioRol ur
      INNER JOIN TiCentral.Roles rol
        ON ur.IdRol = rol.Id
      INNER JOIN TiCentral.RolMenus rm
        ON rm.IdRol = rol.Id
      INNER JOIN TiCentral.Menus men
        ON men.Id = rm.IdMenu
      INNER JOIN TiCentral.MenuPermisos rmenp
        ON rmenp.IdMenu = rm.IdMenu
       AND rmenp.IdRol = rol.Id
      INNER JOIN TiCentral.Permisos per
        ON per.Id = rmenp.IdPermiso
      WHERE ur.IdUsuario = ?
        AND rol.IdApp = ?
        AND IFNULL(ur.Deleted, 0) = 0
        AND IFNULL(rol.Deleted, 0) = 0
        AND IFNULL(rm.Deleted, 0) = 0
        AND IFNULL(men.Deleted, 0) = 0
        AND IFNULL(rmenp.Deleted, 0) = 0
        AND IFNULL(per.Deleted, 0) = 0
    `;

    const result = await queryAsync(query, [userId, appId]);

    if (result.length) {
      return [result];
    }

    return [];
  } catch (err) {
    return [];
  }
}