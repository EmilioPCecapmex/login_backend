delimiter $$

CREATE TABLE `Usuarios` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Nombre` varchar(20) NOT NULL,
  `ApellidoPaterno` varchar(20) NOT NULL,
  `ApellidoMaterno` varchar(20) NOT NULL,
  `NombreUsuario` varchar(30) NOT NULL,
  `CorreoElectronico` varchar(50) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `UltimoInicioDeSesion` datetime NOT NULL,
  `EstaActivo` tinyint(1) NOT NULL DEFAULT 0,
  `CreadoPor` char(36) NOT NULL DEFAULT '0',
  `FechaDeCreacion` datetime NOT NULL,
  `UltimaModificacion` datetime NOT NULL,
  `ModificadoPor` char(36) NOT NULL DEFAULT '',
  `Deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3$$

