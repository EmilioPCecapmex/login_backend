CREATE DEFINER = `root` @`%` PROCEDURE `sp_DesvinculaUsuarioApp`(
    IN `P_IdUsuario` CHAR(36),
    IN `P_IdApp` CHAR(36)
) BEGIN IF (
    SELECT
        COUNT(*)
    FROM
        TiCentral.UsuarioAplicacion
    WHERE
        IdApp = P_IdApp
        AND IdUsuario = P_IdUsuario
) = 1 THEN
DELETE FROM
    TiCentral.UsuarioAplicacion
WHERE
    IdUsuario = P_IdUsuario
    AND IdApp = P_IdApp;

SELECT
    'Registro eliminado' AS success;

ELSE
SELECT
    'Vinculo no existe' AS warning;

END IF;

END