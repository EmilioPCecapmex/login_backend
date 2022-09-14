CREATE DEFINER = `root` @`%` PROCEDURE `sp_VinculaUsuarioApps`(
    IN `P_IdUsuario` CHAR(36),
    IN `P_IdApp` CHAR(36),
    IN `P_Estado` TINYINT(1)
) BEGIN IF P_Estado = 1 THEN CALL sp_VinculaUsuarioApp(P_IdUsuario, P_IdApp);

ELSEIF P_Estado = 0 THEN CALL sp_DesvinculaUsuarioApp(P_IdUsuario, P_IdApp);

END IF;

END