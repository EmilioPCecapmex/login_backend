CREATE DEFINER = `root` @`%` PROCEDURE `sp_ListaUsuarios`() BEGIN
SELECT
    US.Id,
    US.EstaActivo,
    US.Nombre,
    US.ApellidoPaterno,
    US.ApellidoMaterno,
    US.NombreUsuario,
    US.CorreoElectronico,
    US.CreadoPor,
    (
        SELECT
            NombreUsuario
        FROM
            TiCentral.Usuarios
        WHERE
            Id = US.ModificadoPor
    ) AS ModificadoPor,
    (
        SELECT
            NombreUsuario
        FROM
            TiCentral.Usuarios
        WHERE
            Id = US.CreadoPor
    ) AS CreadoPor
FROM
    TiCentral.Usuarios US
WHERE
    US.Deleted = 0;

END