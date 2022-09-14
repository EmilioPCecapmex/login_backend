CREATE DEFINER = `root` @`%` PROCEDURE `sp_ActualizaInicioSesion`(IN `P_Id` CHAR(36)) BEGIN
UPDATE
    TiCentral.Usuarios us
SET
    us.UltimoInicioDeSesion = CURRENT_TIMESTAMP()
WHERE
    us.Id = P_Id;

END