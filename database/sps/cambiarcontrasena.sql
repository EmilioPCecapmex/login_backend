CREATE DEFINER = `root` @`%` PROCEDURE `sp_CambiarContrasena`(
    IN `P_id` CHAR(36),
    IN `P_Contrasena` VARCHAR(255)
) BEGIN
UPDATE
    TiCentral.Usuarios us
SET
    us.Contrasena = P_Contrasena
WHERE
    us.Id = P_id;

SELECT
    Id,
    Nombre,
    NombreUsuario,
    CorreoElectronico
FROM
    TiCentral.Usuarios
WHERE
    Id = P_id;

END