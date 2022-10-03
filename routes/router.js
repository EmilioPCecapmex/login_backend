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
} = require("../controllers/users/getUsers.js");
const { getAppDetail, getAppsInfo, getUserApps } = require("../controllers/apps/getApps.js");
const { deleteUser } = require("../controllers/users/deleteUser.js");
const { deleteApp } = require("../controllers/apps/deleteApp.js");
const { modifyUser } = require("../controllers/users/modifyUser.js");
const { modifyApp } = require("../controllers/apps/modifyApp.js");
const { changePassword, forgotPassword } = require("../controllers/users/changePassword.js");
const { createApp } = require("../controllers/apps/createApp.js");
const { linkUserApp, unlinkUserApp, manageUserApps } = require("../controllers/apps/linkUserApp.js");
const { activateApp } = require("../controllers/apps/activateApp.js");



// routes/router.js

router.post("/login", (req, res, next) => {
  userLogin(req, res);
});

router.post("/refresh-token", (req, res, next) => {
  tokenRefresh(req, res);
});

router.post("/verify", verifyToken.isLoggedIn);

//Users
router.post("/user-detail", verifyToken.verifyJWT, (req, res, next) => {
  getUserDetail(req, res);
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

router.put("/change-password",verifyToken.verifyJWT, (req, res) => {
  changePassword(req, res);
});

router.post("/forgot-password", (req, res) => {
  forgotPassword(req, res);
});

router.get("/activate", (req, res) => {
  activateUser(req, res);
});

router.post("/user-apps", verifyToken.verifyJWT, (req, res, next) => {
  getUserApps(req, res);
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

module.exports = router;
