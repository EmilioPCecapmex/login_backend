CREATE DEFINER = `root` @`%` PROCEDURE `sp_DetalleAppUsuario`(IN `P_IdUsuario` CHAR(36)) BEGIN IF(
    (
        SELECT
            EstaActivo
        From
            TiCentral.Usuarios
        WHERE
            TiCentral.Usuarios.Id = P_IdUsuario
    ) = 1
) THEN IF(
    (
        SELECT
            COUNT(*)
        FROM
            TiCentral.UsuarioAplicacion
        WHERE
            IdUsuario = P_IdUsuario
    ) > 0
) THEN
SELECT
    AP.Id IdApp,
    AP.Nombre,
    AP.Path
FROM
    TiCentral.Usuarios US
    INNER JOIN TiCentral.UsuarioAplicacion UA ON US.Id = UA.IdUsuario
    INNER JOIN TiCentral.Apps AP ON AP.Id = UA.IdApp
WHERE
    US.Id = P_IdUsuario
    AND US.EstaActivo = 1;

ELSE
SELECT
    'tu usuario no tiene aplicaciones vinculadas.' AS Msg;

END IF;

ELSEIF (
    (
        SELECT
            EstaActivo
        From
            TiCentral.Usuarios
        WHERE
            TiCentral.Usuarios.Id = P_IdUsuario
    ) = 0
) THEN
SELECT
    'El usuario no esta activo.' AS Msg;

END IF;

END