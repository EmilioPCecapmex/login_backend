CREATE DEFINER = `root` @`%` PROCEDURE `sp_ExisteUsuario`(
    IN `P_NombreUsuario` VARCHAR(30),
    IN `P_CorreoElectronico` VARCHAR(50)
) BEGIN
SELECT
    (
        SELECT
            count(*)
        FROM
            TiCentral.Usuarios us
        WHERE
            us.NombreUsuario = P_NombreUsuario
    ) AS ExisteUsuario,
    (
        SELECT
            count(*)
        FROM
            TiCentral.Usuarios us
        WHERE
            us.CorreoElectronico = P_CorreoElectronico
    ) AS ExisteCorreoElectronico;

END