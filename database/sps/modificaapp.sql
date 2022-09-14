CREATE DEFINER = `root` @`%` PROCEDURE `sp_ModificaApp`(
    IN `P_Id` CHAR(36),
    IN `P_Nombre` VARCHAR(30),
    IN `P_Path` VARCHAR(30),
    IN `P_IdUsuario` CHAR(36)
) BEGIN
UPDATE
    TiCentral.Apps
SET
    Nombre = P_Nombre,
    Path = P_Path,
    UltimaModificacion = CURRENT_TIMESTAMP(),
    ModificadoPor = P_IdUsuario
WHERE
    Id = P_Id;

SELECT
    *
FROM
    TiCentral.Apps
WHERE
    Id = P_Id;

END