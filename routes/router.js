const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/users/validateRegister.js");
const verifyToken = require("../controllers/auth/verifyToken.js");

const { sendEmail } = require("../controllers/mail/sendMail.js");
const { createUser } = require("../controllers/users/createUser.js");
const { userLogin, tokenRefresh } = require("../controllers/auth/userLogin.js");
const { activateUser } = require("../controllers/users/activateUser.js");
const {
  getUserDetail,
  getUsersInfo,
  getUserAppDetail,
  getUsuariosRoles,
  getUserPermissionsDetail,
  getUserEmailRolControlInterno,
} = require("../controllers/users/getUsers.js");
const { getAppDetail, getAppsInfo, getUserApps, getUsersApp } = require("../controllers/apps/getApps.js");
const { deleteUser } = require("../controllers/users/deleteUser.js");
const { consultaCatalogos, getUsuariosAsignables } = require("../controllers/consultas/consultaCatalogos.js");
const { deleteApp } = require("../controllers/apps/deleteApp.js");
const { modifyUser } = require("../controllers/users/modifyUser.js");
const { modifyApp } = require("../controllers/apps/modifyApp.js");
const { changePassword, forgotPassword, setPassword } = require("../controllers/users/changePassword.js");
const { createApp } = require("../controllers/apps/createApp.js");
const { linkUserApp, unlinkUserApp, manageUserApps } = require("../controllers/apps/linkUserApp.js");
const { activateApp } = require("../controllers/apps/activateApp.js");
const { getUsersTypes } = require("../controllers/users/getUserTypes.js");
const { getSolicitudes, getDetalleSolicitud, getDatosAdicionalesSolicitud } = require("../controllers/solicitudesComentarios/getSolicitudes.js");
const {createSolicitud} = require("../controllers/solicitudesComentarios/createSolicitud.js");
const { createComentario } = require("../controllers/solicitudesComentarios/createComentario.js");
const {modifySolicitud} = require("../controllers/solicitudesComentarios/modifySolicitud.js");
const {getTipoSolicitud} = require("../controllers/solicitudesComentarios/getTipoSolicitud.js");
const {getSolicitudesApp} = require("../controllers/solicitudesComentarios/getSolicitudesApp.js");
const {solicitudTransaction} = require("../controllers/solicitudesComentarios/solicitudesTransaction.js");
const { getSolicitudUsuario } = require("../controllers/solicitudesComentarios/getLastSolicitudUSuario.js");
const {getSolicitudActualDocumento} = require("../controllers/solicitudesComentarios/getSolicitudActualDocumento.js");
const { createRol, modifyRol, getRoles, deleteRol } = require("../controllers/Catalogos/Roles.js");
const { getMenus, getMenusRol, deleteMenuRol, createMenuRol } = require("../controllers/Catalogos/Menu.js");
const { getPermisosMenu, getPermisosMenuRol, createPermisosMenuRol, deletedPermisosMenuRol } = require("../controllers/Catalogos/Permisos.js");

//Se agrega Controlador de endpoints donde se obtiene el Padre de una Dependencia y todo lo que hay para llegar a ella 
//a partir de la Dependencia ligada a un Usuario
const { validEmailExist, validUserNameExist } = require("../controllers/solicitudesComentarios/validUserExist.js");
const { getUsuarioEntidad, detalleEntidad, crearEntidad, getEntidades, eliminarEntidad, modificarEntidad, getEntidadesSelect, getUsuarioEntidadNivel } = require("../controllers/users/detalleUsuarioSecretaria.js");
const { getTipoEntidades, crearTipoEntidad, editarTipoEntidad, eliminarTipoEntidad } = require("../controllers/Catalogos/TipoEntidades.js");
const { getListas } = require("../controllers/Catalogos/Listas.js");
const { createPreguntaFrecuente, deletePreguntasFrecuentes, getPreguntasFrecuentes } = require("../controllers/ayudas/Ayudas.js");
const { createAdminMenu, deleteAdminMenu, getAdminMenu, getMenusPadre, editarMenu } = require("../controllers/AdminMenus/AdminMenus.js");
const { createAdminPermiso, deleteAdminPermiso, getAdminPermiso, editarPermiso } = require("../controllers/AdminMenus/AdminPermisos.js");
const { getSecretariaByEntidad } = require("../controllers/Catalogos/Entidades.js");


// routes/router.js

// PABMI


router.get("/secretaria-by-entidad", (req, res) => {
  getSecretariaByEntidad(req, res);
});

router.post("/lista-usuarios-roles", (req, res) => {
  getUsuariosRoles(req, res);
});

router.post("/detalle-usuarios-permisos", (req, res) => {
  getUserPermissionsDetail(req, res);
});

router.post("/email-rol-controlInterno",(req,res)=>{
  getUserEmailRolControlInterno(req,res)
})
//Entidades

router.post("/create-entidad", (req, res) => {
  crearEntidad(req, res);
});

router.put("/editar-entidad", (req, res) => {
  modificarEntidad(req, res);
});


router.post("/lista-usuario-entidades", (req, res) => {
  getUsuarioEntidad(req, res);
});

router.post("/detalle-usuario-entidades", (req, res) => {
  getUsuarioEntidadNivel(req, res);
});

router.get("/detalle-entidad", (req, res) => {
  detalleEntidad(req, res);
});

router.get("/lista-entidades", (req, res) => {
  getEntidades(req, res);
});

router.get("/lista-entidades-select", (req, res) => {
  getEntidadesSelect(req, res);
});


router.delete("/eliminar-entidad", (req, res) => {
  eliminarEntidad(req, res);
});


//TipoEntidades
router.post("/create-tipo-entidad", (req, res) => {
  crearTipoEntidad(req, res);
});

router.get("/lista-tipo-entidades", (req, res) => {
  getTipoEntidades(req, res);
});

router.put("/editar-tipo-entidad", (req, res) => {
  editarTipoEntidad(req, res);
});

router.delete("/eliminar-tipo-entidad", (req, res) => {
  eliminarTipoEntidad(req, res);
});



//////////// catalogos
router.post("/consulta-catalogos", verifyToken.verifyJWT, (req, res) => {
  consultaCatalogos(req, res);
});

//// catalogos
router.post("/login", (req, res, next) => {
  userLogin(req, res);
});

router.post("/refresh-token", (req, res, next) => {
  tokenRefresh(req, res);
});

router.post("/verify", verifyToken.isLoggedIn);

// Users
router.post("/user-detail", verifyToken.verifyJWT, (req, res) => {
  getUserDetail(req, res);
});

router.post("/userapp-detail",  (req, res) => {
  getUserAppDetail(req, res);
});

router.get("/users", verifyToken.verifyJWT, (req, res) => {
  getUsersInfo(req, res);
});

router.delete("/user", verifyToken.verifyJWT, (req, res) => {
  deleteUser(req, res);
});

router.put("/user", verifyToken.verifyJWT, (req, res) => {
  modifyUser(req, res);
});

router.put("/change-password", verifyToken.verifyJWT, (req, res) => {
  changePassword(req, res);
});

router.put("/set-password", 
verifyToken.verifyJWT, 
(req, res) => {
  setPassword(req, res);
});



router.post("/forgot-password", (req, res) => {
  forgotPassword(req, res);
});

router.post("/user-apps", verifyToken.verifyJWT, (req, res, next) => {
  getUserApps(req, res);
});


router.get("/users-app",(req, res, next) => {
  getUsersApp(req, res);
});


router.get("/users-app",(req, res, next) => {
  getUsersApp(req, res);
});
//Apps
router.post("/app-detail", verifyToken.verifyJWT, (req, res, next) => {
  getAppDetail(req, res);
});

router.get("/apps", verifyToken.verifyJWT, (req, res) => {
  getAppsInfo(req, res);
});

router.delete("/app", verifyToken.verifyJWT, (req, res) => {
  deleteApp(req, res);
});

router.put("/app", verifyToken.verifyJWT, (req, res) => {
  modifyApp(req, res);
});

router.post("/create-app", verifyToken.verifyJWT, (req, res, next) => {
  createApp(req, res);
});

router.post("/activate-app", verifyToken.verifyJWT, (req, res, next) => {
  activateApp(req, res);
});

router.post("/link-userapp", verifyToken.verifyJWT, (req, res, next) => {
  linkUserApp(req, res);
});

router.post("/unlink-userapp", verifyToken.verifyJWT, (req, res, next) => {
  unlinkUserApp(req, res);
});

router.post("/manage-links", verifyToken.verifyJWT, (req, res, next) => {
  manageUserApps(req, res);
});

router.post("/sign-up", verifyToken.verifyJWT, registerUser.validateRegister, (req, res, next) => {
  createUser(req, res);
});

router.post("/send-email", (req, res) => {
  sendEmail(req, res);
});

router.post("/user-types",verifyToken.verifyJWT, (req, res) => {
  getUsersTypes(req, res);
});


//listado de solicitudes
router.get("/solicitudes",verifyToken.verifyJWT, (req, res) => {
  getSolicitudes(req, res);
}); 

//detalle de solicitud
router.get("/detalleSol",verifyToken.verifyJWT, (req, res) => {
  getDetalleSolicitud(req, res);
})

//datosAdicionales Solicitud
router.get("/datosAdicionalesSolicitud",verifyToken.verifyJWT, (req, res) => {
  getDatosAdicionalesSolicitud(req, res);
})
//Crear solicitud
router.post("/create-solicitud", verifyToken.verifyJWT, (req, res) => {
  createSolicitud(req, res);
});

//Crear comentario
router.post("/create-comentario", verifyToken.verifyJWT, (req, res, next) => {
  createComentario(req, res);
});

router.put("/modify-Solicitud", verifyToken.verifyJWT, (req, res) => {
  modifySolicitud(req, res);
});

//lista tipo Solicitudes
router.get("/tipoSolicitudes",verifyToken.verifyJWT, (req, res) => {
  getTipoSolicitud(req, res);
})

//lista Solicitudes por APP
router.get("/solicitudes-app",verifyToken.verifyJWT, (req, res) => {
  getSolicitudesApp(req, res);
})

//logica de solicitud
router.put("/solicitud-transaction", verifyToken.verifyJWT, (req, res, next) => {
  solicitudTransaction(req, res);
});

//Ultima solicitud del usuario
router.get("/docSolicitudUsuario",verifyToken.verifyJWT, (req, res) => {
  getSolicitudUsuario(req, res);
});

router.get("/docSolicitudActualUsuario",verifyToken.verifyJWT, (req, res) => {
  getSolicitudActualDocumento(req, res);
});


//................................................CATALOGOS...........................................................
//Listas

router.get("/listas", (req, res) => {
  getListas(req, res);
});

//ROLES
router.post("/rol", (req, res, next) => {
  createRol(req, res);
});

router.get("/roles", (req, res) => {
  getRoles(req, res);
});

router.put("/rol", (req, res) => {
  modifyRol(req, res);
});

router.delete("/rol", (req, res) => {
  deleteRol(req, res);
});

router.get("/usuarios-asignables", (req, res) => {
  getUsuariosAsignables(req, res);
});

router.get("/entidad-padre",(req,res)=>{
  getEntidadPadre(req,res)
})

router.get("/menus",(req,res)=>{
  getMenus(req,res)
})

router.get("/menus-rol",(req,res)=>{
  getMenusRol(req,res)
})

router.get("/permisos-menu",(req,res)=>{
  getPermisosMenu(req,res)
})

router.get("/permisos-menu-rol",(req,res)=>{
  getPermisosMenuRol(req,res)
})

router.delete("/menu-rol",(req,res)=>{
  deleteMenuRol(req,res)
})

router.post("/menu-rol",(req,res)=>{
  createMenuRol(req,res)
})

router.post("/permiso-menu-rol",(req,res)=>{
  createPermisosMenuRol(req,res)
})
router.delete("/permiso-menu-rol",(req,res)=>{
  deletedPermisosMenuRol(req,res)
})

router.post("/validar-email",(req,res)=>{
  validEmailExist(req,res)
})


router.post("/validar-username",(req,res)=>{
  validUserNameExist(req,res)
})

//#################################Admin Ayudas####################################
router.post("/ayuda",(req,res)=>{
  createPreguntaFrecuente(req,res)
})

router.get("/ayuda",(req,res)=>{
  getPreguntasFrecuentes(req,res)
})

router.delete("/ayuda",(req,res)=>{
  deletePreguntasFrecuentes(req,res)
  
})

//Admin Menus
router.post("/AdminMenu",(req,res)=>{
  createAdminMenu(req,res)
})

router.get("/AdminMenu",(req,res)=>{
  getAdminMenu(req,res)
})

router.delete("/AdminMenu",(req,res)=>{
  deleteAdminMenu(req,res)
})

router.get("/AdminMenu",(req,res)=>{
  getMenusPadre(req,res)
})

router.put("/AdminMenu", (req, res) => {
  editarMenu(req, res);
});

//Admin Permisos
router.post("/AdminPermiso",(req,res)=>{
  createAdminPermiso(req,res)
})

router.get("/AdminPermiso",(req,res)=>{
  getAdminPermiso(req,res)
})

router.delete("/AdminPermiso",(req,res)=>{
  deleteAdminPermiso(req,res)
})

router.put("/AdminPermiso", (req, res) => {
  editarPermiso(req, res);
});











router.get("/prueba-sendEmail",()=>{
  const d = {
    to: "pedropardog009@gmail.com",
    subject: "¡Bienvenido!",
    nombre: 'pedro ricardo pardo gaytan',
    usuario: 'prpardo',
    contrasena: 'genPassword',
    userid: 'IdUsuario',
  };

  console.log(d);
  sendEmail(d);
})


module.exports = router;
