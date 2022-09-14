CREATE DEFINER = `root` @`%` PROCEDURE `sp_VinculaUsuarioApp`(
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
SELECT
    'Vinculo ya existe' AS message;

ELSE
INSERT INTO
    TiCentral.UsuarioAplicacion (IdUsuario, IdApp)
VALUES
    (P_IdUsuario, P_IdApp);

SELECT
    Id
FROM
    TiCentral.UsuarioAplicacion
WHERE
    IdUsuario = P_IdUsuario
    AND IdApp = P_IdApp;

END IF;

END