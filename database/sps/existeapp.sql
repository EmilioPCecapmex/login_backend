CREATE DEFINER = `root` @`%` PROCEDURE `sp_ExisteApp`(
    IN `P_Nombre` VARCHAR(30),
    IN `P_Path` VARCHAR(50)
) BEGIN
SELECT
    (
        SELECT
            count(*)
        FROM
            TiCentral.Apps ap
        WHERE
            ap.Nombre = P_Nombre
    ) AS ExisteNombre,
    (
        SELECT
            count(*)
        FROM
            TiCentral.Apps ap
        WHERE
            ap.Path = P_Path
    ) AS ExistePath;

END