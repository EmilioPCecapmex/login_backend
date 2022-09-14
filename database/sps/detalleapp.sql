CREATE DEFINER = `root` @`%` PROCEDURE `sp_DetalleApp`(IN `P_Id` CHAR(36)) BEGIN
SELECT
    *
FROM
    TiCentral.Apps
WHERE
    id = P_Id;

END