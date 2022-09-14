CREATE DEFINER = `root` @`%` PROCEDURE `sp_BajaUsuario`(IN `P_Id` CHAR(36)) BEGIN
UPDATE
    TiCentral.Usuarios us
SET
    us.Deleted = 1,
    us.EstaActivo = 0
WHERE
    us.Id = P_Id;

IF (
    SELECT
        Deleted
    FROM
        TiCentral.Usuarios
    WHERE
        ID = P_Id
) = 1 THEN
SELECT
    "Baja Exitosa" AS message;

ELSE
SELECT
    "Verificar Id Usuario" AS error;

END IF;

END