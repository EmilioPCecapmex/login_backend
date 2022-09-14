CREATE DEFINER = `root` @`%` PROCEDURE `sp_OlvideContrasena`(
    IN `P_usuario` CHAR(36),
    IN `P_Contrasena` VARCHAR(255)
) BEGIN
UPDATE
    TiCentral.Usuarios us
SET
    us.Contrasena = P_Contrasena
WHERE
    us.NombreUsuario = P_usuario
    OR us.CorreoElectronico = P_usuario;

SELECT
    Id,
    Nombre,
    NombreUsuario,
    CorreoElectronico
FROM
    TiCentral.Usuarios us
WHERE
    us.NombreUsuario = P_usuario
    OR us.CorreoElectronico = P_usuario;

END