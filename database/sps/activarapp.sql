CREATE DEFINER = `root` @`%` PROCEDURE `sp_ActivarApp`(IN `P_Id` CHAR(36)) BEGIN IF (
    SELECT COUNT(*)
    FROM TiCentral.Apps
    WHERE Id = P_Id
) = 1 THEN
UPDATE TiCentral.Apps
SET EstaActivo = 1
WHERE Id = P_Id;
SELECT P_Id AS appId,
    'activo' AS Result;
ELSE
SELECT 'Verifica ID' AS message;
END IF;
END