CREATE DEFINER = `root` @`%` PROCEDURE `sp_BajaApp`(IN `P_Id` CHAR(36)) BEGIN
UPDATE
    TiCentral.Apps
SET
    deleted = 1
WHERE
    Id = P_Id;

IF (
    SELECT
        Deleted
    FROM
        TiCentral.Apps
    WHERE
        ID = P_Id
) = 1 THEN
SELECT
    "Baja Exitosa" AS message;

ELSE
SELECT
    "Verificar Id App" AS error;

END IF;

END