CREATE DEFINER = `root` @`%` PROCEDURE `sp_ListaApp`() BEGIN
SELECT
    *
FROM
    TiCentral.Apps;

END