CREATE DEFINER = `root` @`%` PROCEDURE `sp_ActivarUsuario`(IN `P_Id` CHAR(36)) BEGIN IF (
    SELECT
        COUNT(*)
    FROM
        TiCentral.Usuarios
    WHERE
        Id = P_Id
) = 1 THEN
UPDATE
    TiCentral.Usuarios us
SET
    us.EstaActivo = 1
WHERE
    us.Id = P_Id;

SELECT
    P_Id AS UserId,
    'activo' AS Result;

ELSE
SELECT
    'Verifica ID' AS message;

END IF;