CREATE DEFINER = `root` @`%` PROCEDURE `sp_CrearUsuario`(
    IN `P_Nombre` VARCHAR(20),
    IN `P_ApellidoPaterno` VARCHAR(20),
    IN `P_ApellidoMaterno` VARCHAR(20),
    IN `P_NombreUsuario` VARCHAR(30),
    IN `P_CorreoElectronico` VARCHAR(50),
    IN `P_Contrasena` VARCHAR(255),
    IN `P_IdUsuario` CHAR(36)
) BEGIN
INSERT INTO
    TiCentral.Usuarios(
        Nombre,
        ApellidoPaterno,
        ApellidoMaterno,
        NombreUsuario,
        CorreoElectronico,
        Contrasena,
        UltimoInicioDeSesion,
        CreadoPor,
        FechaDeCreacion,
        UltimaModificacion,
        ModificadoPor
    )
VALUES
(
        P_Nombre,
        P_ApellidoPaterno,
        P_ApellidoMaterno,
        P_NombreUsuario,
        P_CorreoElectronico,
        P_Contrasena,
        CURRENT_TIMESTAMP(),
        P_IdUsuario,
        CURRENT_TIMESTAMP(),
        CURRENT_TIMESTAMP(),
        P_IdUsuario
    );

SELECT
    *
FROM
    TiCentral.Usuarios
WHERE
    Nombre = P_Nombre
    and ApellidoPaterno = P_ApellidoPaterno
    and ApellidoMaterno = P_ApellidoMaterno
    and NombreUsuario = P_NombreUsuario
    and CorreoElectronico = P_CorreoElectronico
    and CreadoPor = P_IdUsuario;

END