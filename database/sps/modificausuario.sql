CREATE DEFINER = `TIAdmin` @`%` PROCEDURE `sp_ModificaUsuario`(
    IN `P_Id` CHAR(36),
    IN `P_Nombre` VARCHAR(20),
    IN `P_ApellidoPaterno` VARCHAR(20),
    IN `P_ApellidoMaterno` VARCHAR(20),
    IN `P_EstaActivo` TINYINT(1),
    IN `P_IdUsuario` CHAR(36)
) BEGIN
UPDATE
    TiCentral.Usuarios
SET
    Nombre = P_Nombre,
    ApellidoPaterno = P_ApellidoPaterno,
    ApellidoMaterno = P_ApellidoMaterno,
    UltimaModificacion = CURRENT_TIMESTAMP(),
    EstaActivo = P_EstaActivo,
    ModificadoPor = P_IdUsuario
WHERE
    Usuarios.Id = P_Id;

SELECT
    us.Id,
    us.Nombre,
    us.ApellidoPaterno,
    us.ApellidoMaterno,
    us.NombreUsuario,
    us.CorreoElectronico,
    us.UltimoInicioDeSesion,
    us.EstaActivo,
    us.CreadoPor,
    us.ModificadoPor,
    us.Deleted
FROM
    TiCentral.Usuarios us
WHERE
    us.Id = P_Id;

END