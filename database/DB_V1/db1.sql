USE ecoturismo;

CREATE TABLE `ecoturismo`.`usuarios` (
    `id_usuario` INT NOT NULL AUTO_INCREMENT,
    `email_usuario` VARCHAR(45) NOT NULL,
    `pass_usuario` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id_usuario`)
);

CREATE TABLE `ecoturismo`.`perfiles` (
    `id_perfil` INT NOT NULL AUTO_INCREMENT,
    `id_usuario` INT NOT NULL,
    `img_perfil` LONGBLOB NULL,
    `nombre_perfil` VARCHAR(45) NOT NULL,
    `apellido_perfil` VARCHAR(45) NULL,
    PRIMARY KEY (`id_perfil`),
    UNIQUE INDEX `id_usuario_UNIQUE` (`id_usuario` ASC) VISIBLE,
    CONSTRAINT `fk_usuario_perfil`
        FOREIGN KEY (`id_usuario`)
        REFERENCES `ecoturismo`.`usuarios` (`id_usuario`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE `ecoturismo`.`destinos` (
    `id_destino` INT NOT NULL AUTO_INCREMENT,
    `nombre_destino` VARCHAR(45) NOT NULL,
    `direccion_destino` VARCHAR(100) NOT NULL,
    `caracteristica_destino` VARCHAR(255) NOT NULL,
    `img_destino` LONGBLOB NOT NULL,
    `telefono_destino` DOUBLE NOT NULL,
    `email_destino` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id_destino`)
);

CREATE TABLE `ecoturismo`.`comentarios` (
    `id_comentario` INT NOT NULL,
    `id_perfil` INT NULL,
    `id_destino` INT NULL,
    `calificacion_comentario` INT NULL,
    `fecha_comentario` TIMESTAMP NOT NULL,
    `contenido_comentario` VARCHAR(250) NULL,
    PRIMARY KEY (`id_comentario`),
    INDEX `fk_destino_comentario_idx` (`id_destino` ASC) VISIBLE,
    INDEX `fk_destino_perfil_idx` (`id_perfil` ASC) VISIBLE,
    CONSTRAINT `fk_destino_comentario`
        FOREIGN KEY (`id_destino`)
        REFERENCES `ecoturismo`.`destinos` (`id_destino`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `fk_destino_perfil`
        FOREIGN KEY (`id_perfil`)
        REFERENCES `ecoturismo`.`perfiles` (`id_perfil`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);