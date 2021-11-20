USE ecoturismo;

CREATE TABLE `ecoturismo`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `email_usuario` VARCHAR(255) NOT NULL,
  `pass_usuario` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_usuario_UNIQUE` (`email_usuario` ASC) VISIBLE);

CREATE TABLE `ecoturismo`.`perfiles` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_perfil` VARCHAR(255) NOT NULL,
  `apellido_perfil` VARCHAR(255) NOT NULL,
  `fecha_creacion_perfil` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `fk_perfil_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ecoturismo`.`usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `ecoturismo`.`magnitudes` (
  `id_magnitud` INT NOT NULL AUTO_INCREMENT,
  `magnitud` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_magnitud`));

CREATE TABLE `ecoturismo`.`regiones` (
  `id_region` INT NOT NULL AUTO_INCREMENT,
  `region` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_region`));

CREATE TABLE `ecoturismo`.`ubicaciones` (
  `id_ubicacion` INT NOT NULL AUTO_INCREMENT,
  `id_region` INT NOT NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_ubicacion`),
  INDEX `fk_ubicacion_region_idx` (`id_region` ASC) VISIBLE,
  CONSTRAINT `fk_ubicacion_region`
    FOREIGN KEY (`id_region`)
    REFERENCES `ecoturismo`.`regiones` (`id_region`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `ecoturismo`.`recomendaciones` (
  `id_recomendacion` INT NOT NULL AUTO_INCREMENT,
  `recomendacion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_recomendacion`));

CREATE TABLE `ecoturismo`.`destinos` (
  `id_destino` INT NOT NULL AUTO_INCREMENT,
  `id_magnitud` INT NOT NULL,
  `id_ubicacion` INT NOT NULL,
  `id_recomendacion` INT NOT NULL,
  `nombre_destino` VARCHAR(255) NOT NULL,
  `contenido_destino` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_destino`),
  INDEX `fk_destino_magnitud_idx` (`id_magnitud` ASC) VISIBLE,
  INDEX `fk_destino_ubicacion_idx` (`id_ubicacion` ASC) VISIBLE,
  INDEX `fk_destino_recomendacion_idx` (`id_recomendacion` ASC) VISIBLE,
  CONSTRAINT `fk_destino_magnitud`
    FOREIGN KEY (`id_magnitud`)
    REFERENCES `ecoturismo`.`magnitudes` (`id_magnitud`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_destino_ubicacion`
    FOREIGN KEY (`id_ubicacion`)
    REFERENCES `ecoturismo`.`ubicaciones` (`id_ubicacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_destino_recomendacion`
    FOREIGN KEY (`id_recomendacion`)
    REFERENCES `ecoturismo`.`recomendaciones` (`id_recomendacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `ecoturismo`.`comentarios` (
  `id_usuario` INT NOT NULL,
  `id_destino` INT NOT NULL,
  `contenido_comentario` VARCHAR(255) NOT NULL,
  `fecha_creacion_comentario` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`, `id_destino`),
  INDEX `fk_comentario_destino_idx` (`id_destino` ASC) VISIBLE,
  CONSTRAINT `fk_comentario_perfil`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ecoturismo`.`perfiles` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comentario_destino`
    FOREIGN KEY (`id_destino`)
    REFERENCES `ecoturismo`.`destinos` (`id_destino`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `ecoturismo`.`publicaciones` (
  `id_usuario` INT NOT NULL,
  `id_destino` INT NOT NULL,
  `like_publicacion` INT NULL DEFAULT 0,
  `denuncia_publicacion` INT NULL DEFAULT 0,
  PRIMARY KEY (`id_usuario`, `id_destino`),
  INDEX `fk_publicacion_destino_idx` (`id_destino` ASC) VISIBLE,
  CONSTRAINT `fk_publicacion_perfil`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ecoturismo`.`perfiles` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_publicacion_destino`
    FOREIGN KEY (`id_destino`)
    REFERENCES `ecoturismo`.`destinos` (`id_destino`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `ecoturismo`.`imagenes` (
  `id_usuario` INT NOT NULL,
  `id_destino` INT NULL,
  `img_imagenes` BLOB NOT NULL,
  `ubicacion_imagenes` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_imagen_destino_idx` (`id_destino` ASC) VISIBLE,
  CONSTRAINT `fk_imagen_perfil`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ecoturismo`.`perfiles` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_imagen_destino`
    FOREIGN KEY (`id_destino`)
    REFERENCES `ecoturismo`.`destinos` (`id_destino`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);