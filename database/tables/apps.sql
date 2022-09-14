delimiter $$

CREATE TABLE `Apps` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `Nombre` varchar(30) NOT NULL,
  `Path` varchar(30) NOT NULL,
  `EstaActivo` tinyint(1) NOT NULL DEFAULT 0,
  `CreadoPor` char(36) NOT NULL,
  `FechaDeCreacion` datetime NOT NULL,
  `UltimaModificacion` datetime NOT NULL,
  `ModificadoPor` char(36) NOT NULL,
  `Deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`),
  KEY `FK1_Apps_C` (`CreadoPor`),
  KEY `FK2_Apps_M` (`ModificadoPor`),
  CONSTRAINT `FK1_Apps_C` FOREIGN KEY (`CreadoPor`) REFERENCES `Usuarios` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK2_Apps_M` FOREIGN KEY (`ModificadoPor`) REFERENCES `Usuarios` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3$$

