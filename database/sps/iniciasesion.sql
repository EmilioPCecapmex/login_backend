CREATE DEFINER = `root` @`%` PROCEDURE `sp_IniciaSesion`(IN `P_Usuario` VARCHAR(50)) BEGIN
SET
    @UserId = (
        SELECT
            Id
        FROM
            Usuarios
        WHERE
            NombreUsuario = P_Usuario
            OR CorreoElectronico = P_Usuario
    );

IF (
    SELECT
        EstaActivo
    FROM
        TiCentral.Usuarios
    WHERE
        NombreUsuario = P_Usuario
        OR CorreoElectronico = P_Usuario
) = 1 THEN
SELECT
    US.Id,
    US.NombreUsuario,
    US.CorreoElectronico,
    US.Contrasena
FROM
    TiCentral.Usuarios US
WHERE
    US.NombreUsuario = P_Usuario
    OR US.CorreoElectronico = P_Usuario;

CALL sp_DetalleAppUsuario(@UserId);

ELSEIF (
    SELECT
        EstaActivo
    FROM
        TiCentral.Usuarios
    WHERE
        NombreUsuario = P_Usuario
        OR CorreoElectronico = P_Usuario
) = 0 THEN
SELECT
    'El usuario no esta activo.' AS Msg;

END IF;

END