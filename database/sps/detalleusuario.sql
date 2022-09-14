CREATE DEFINER = `root` @`%` PROCEDURE `sp_DetalleUsuario`(IN `P_Id` CHAR(36)) BEGIN
SELECT
    us.Id,
    us.Nombre,
    us.ApellidoPaterno,
    us.ApellidoMaterno,
    us.NombreUsuario,
    us.CorreoElectronico,
    us.UltimoInicioDeSesion,
    us.EstaActivo,
    us.CreadoPor,
    us.ModificadoPor,
    us.Deleted
FROM
    TiCentral.Usuarios us
WHERE
    us.Id = P_Id;

END