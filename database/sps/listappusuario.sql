CREATE DEFINER = `root` @`%` PROCEDURE `sp_ListaAppUsuario`(IN `P_Id` CHAR(36)) BEGIN IF (
    SELECT
        COUNT(*)
    FROM
        TiCentral.UsuarioAplicacion
    WHERE
        IdUsuario = P_Id
) >= 1 THEN
SELECT
    UA.Id,
    AP.Nombre Nombre,
    AP.Id IdApp,
    US.Id IdUsuario,
    US.NombreUsuario,
    AP.Path,
    AP.EstaActivo
FROM
    TiCentral.Usuarios US
    INNER JOIN TiCentral.UsuarioAplicacion UA ON US.Id = UA.IdUsuario
    INNER JOIN TiCentral.Apps AP ON AP.Id = UA.IdApp
WHERE
    US.Id = P_Id;

ELSE
SELECT
    'tu usuario no tiene aplicaciones vinculadas.' AS Msg;

END IF;

END