#creacion de la base de datos
CREATE DATABASE `ecoturismo`;

#uso de la base de datos
USE `ecoturismo`;

#tabla  usuarios
CREATE TABLE `ecoturismo`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `email_usuario` VARCHAR(255) NOT NULL,
  `pass_usuario` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_usuario_UNIQUE` (`email_usuario` ASC) VISIBLE);

#tabla perfiles
CREATE TABLE `ecoturismo`.`perfiles` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_perfil` VARCHAR(255) NOT NULL,
  `apellido_perfil` VARCHAR(255) NOT NULL,
  `fecha_creacion_perfil` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `img_perfil` LONGBLOB NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `fk_perfil_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ecoturismo`.`usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

#tabla macroregiones
CREATE TABLE `ecoturismo`.`macroregiones` (
  `id_macroregion` INT NOT NULL AUTO_INCREMENT,
  `macroregion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_macroregion`));

#tabla regiones
CREATE TABLE `ecoturismo`.`regiones` (
  `id_region` INT NOT NULL AUTO_INCREMENT,
  `region` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_region`));

#tabla ubicaciones
CREATE TABLE `ecoturismo`.`ubicaciones` (
  `id_ubicacion` INT NOT NULL AUTO_INCREMENT,
  `id_macroregion` INT NOT NULL,
  `id_region` INT NOT NULL,
  `ciudad_ubicacion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_ubicacion`),
  INDEX `fk_ubicacion_macroregion_idx` (`id_macroregion` ASC) VISIBLE,
  INDEX `fk_ubicacion_region_idx` (`id_region` ASC) VISIBLE,
  CONSTRAINT `fk_ubicacion_macroregion`
    FOREIGN KEY (`id_macroregion`)
    REFERENCES `ecoturismo`.`macroregiones` (`id_macroregion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ubicacion_region`
    FOREIGN KEY (`id_region`)
    REFERENCES `ecoturismo`.`regiones` (`id_region`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

#tabla destinos
CREATE TABLE `ecoturismo`.`destinos` (
  `id_destino` INT NOT NULL AUTO_INCREMENT,
  `id_ubicacion` INT NOT NULL,
  `titulo_destino` VARCHAR(255) NOT NULL,
  `contenido_destino` LONGTEXT NOT NULL,
  `fecha_creacion_destino` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `img_destino` LONGBLOB NULL,
  PRIMARY KEY (`id_destino`),
  INDEX `fk_destino_ubicacion_idx` (`id_ubicacion` ASC) VISIBLE,
  CONSTRAINT `fk_destino_ubicacion`
    FOREIGN KEY (`id_ubicacion`)
    REFERENCES `ecoturismo`.`ubicaciones` (`id_ubicacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

#tabla recomendaciones
CREATE TABLE `ecoturismo`.`recomendaciones` (
  `id_recomendacion` INT NOT NULL AUTO_INCREMENT,
  `id_destino` INT NOT NULL,
  `recomendacion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_recomendacion`),
  INDEX `fk_recomendacion_destino_idx` (`id_destino` ASC) VISIBLE,
  CONSTRAINT `fk_recomendacion_destino`
    FOREIGN KEY (`id_destino`)
    REFERENCES `ecoturismo`.`destinos` (`id_destino`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

#tabla comentarios
CREATE TABLE `ecoturismo`.`comentarios` (
  `id_comentario` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_destino` INT NOT NULL,
  `contenido_comentario` LONGTEXT NOT NULL,
  `fecha_creacion_comentario` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id_comentario`),
  INDEX `fk_comentario_usuario_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_comentario_destino_idx` (`id_destino` ASC) VISIBLE,
  CONSTRAINT `fk_comentario_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ecoturismo`.`perfiles` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comentario_destino`
    FOREIGN KEY (`id_destino`)
    REFERENCES `ecoturismo`.`destinos` (`id_destino`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

#tabla publicaciones
CREATE TABLE `ecoturismo`.`publicaciones` (
  `id_publicacion` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_destino` INT NOT NULL,
  `like_publicacion` INT NULL DEFAULT 0,
  `denuncia_publicacion` INT NULL DEFAULT 0,
  PRIMARY KEY (`id_publicacion`),
  INDEX `fk_publicacion_usuari_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_publicacion_destino_idx` (`id_destino` ASC) VISIBLE,
  CONSTRAINT `fk_publicacion_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ecoturismo`.`usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_publicacion_destino`
    FOREIGN KEY (`id_destino`)
    REFERENCES `ecoturismo`.`destinos` (`id_destino`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);