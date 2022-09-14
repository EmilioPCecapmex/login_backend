CREATE DEFINER = `root` @`%` PROCEDURE `sp_CreaApp`(
    IN `P_Nombre` VARCHAR(30),
    IN `P_Path` VARCHAR(30),
    IN `P_IdUsuario` CHAR(36)
) BEGIN
INSERT INTO
    TiCentral.Apps (
        Nombre,
        Path,
        EstaActivo,
        CreadoPor,
        FechaDeCreacion,
        UltimaModificacion,
        ModificadoPor
    )
VALUES
(
        P_Nombre,
        P_Path,
        0,
        P_IdUsuario,
        CURRENT_TIMESTAMP(),
        CURRENT_TIMESTAMP(),
        P_IdUsuario
    );

SELECT
    Id
FROM
    TiCentral.Apps
WHERE
    Nombre = P_Nombre
    AND Path = P_Path;

END