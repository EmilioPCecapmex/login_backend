delimiter $$

CREATE TABLE `UsuarioAplicacion` (
  `Id` char(36) NOT NULL DEFAULT uuid(),
  `IdUsuario` char(36) NOT NULL,
  `IdApp` char(36) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK1_Usuario` (`IdUsuario`),
  KEY `FK2_App` (`IdApp`),
  CONSTRAINT `FK1_Usuario` FOREIGN KEY (`IdUsuario`) REFERENCES `Usuarios` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK2_App` FOREIGN KEY (`IdApp`) REFERENCES `Apps` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3$$

