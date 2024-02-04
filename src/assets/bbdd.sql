-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema trabajoangular
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS trabajoangular ;

-- -----------------------------------------------------
-- Schema trabajoangular
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS trabajoangular DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema trabajoangular
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS trabajoangular ;

-- -----------------------------------------------------
-- Schema trabajoangular
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS trabajoangular DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE trabajoangular ;

-- -----------------------------------------------------
-- Table trabajoangular.Usuario
-- -----------------------------------------------------
DROP TABLE IF EXISTS trabajoangular.Usuario ;

CREATE TABLE IF NOT EXISTS trabajoangular.Usuario (
  DniUsuario VARCHAR(9) NOT NULL,
  Nombre VARCHAR(45) NOT NULL,
  Apellido VARCHAR(45) NOT NULL,
  Mail VARCHAR(45) NOT NULL,
  Pass VARCHAR(1000) NOT NULL,
  Sexo ENUM('M', 'H', 'NC') NOT NULL,
  Horario ENUM('maniana', 'tarde', 'manianaytarde') NOT NULL,
  Administrador ENUM('Si', 'No') NOT NULL,
  Edad INT NOT NULL,
  DniTutor VARCHAR(9) NULL,
  NombreTutor VARCHAR(45) NULL,
  ApellidoTutor VARCHAR(45) NULL,
  PRIMARY KEY (DniUsuario))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table trabajoangular.Reunion
-- -----------------------------------------------------
DROP TABLE IF EXISTS trabajoangular.Reunion ;

CREATE TABLE IF NOT EXISTS trabajoangular.Reunion (
  idReunion INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(45) NOT NULL,
  IdUsuario VARCHAR(9) NOT NULL,
  Estado ENUM('En Progreso', 'Completada', 'Pendiente') NOT NULL,
  Duracion ENUM('15min', '30min', '1hora', '1hora30min', '2horas') NOT NULL,
  Descripccion VARCHAR(500) NULL,
  Fecha DATE NOT NULL,
  Hora TIME NOT NULL,
  PRIMARY KEY (idReunion))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table trabajoangular.Citas
-- -----------------------------------------------------
DROP TABLE IF EXISTS trabajoangular.Citas ;

CREATE TABLE IF NOT EXISTS trabajoangular.Citas (
  idCitas INT NOT NULL AUTO_INCREMENT,
  Nombre VARCHAR(45) NOT NULL,
  IdUsuario VARCHAR(9) NOT NULL,
  Estado ENUM('En Progreso', 'Completada', 'Pendiente') NOT NULL,
  Descripccion VARCHAR(500) NULL,
  Fecha DATE NOT NULL,
  Hora TIME NOT NULL,
  PRIMARY KEY (idCitas),
  INDEX fk1_idx (IdUsuario ASC) VISIBLE,
  CONSTRAINT fk1
    FOREIGN KEY (IdUsuario)
    REFERENCES trabajoangular.Usuario (DniUsuario)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table trabajoangular.Usuario_has_Reunion
-- -----------------------------------------------------
DROP TABLE IF EXISTS trabajoangular.Usuario_has_Reunion ;

CREATE TABLE IF NOT EXISTS trabajoangular.Usuario_has_Reunion (
  Usuario_idUsuario VARCHAR(9) NOT NULL,
  Reunion_idCitas INT NOT NULL,
  PRIMARY KEY (Usuario_idUsuario, Reunion_idCitas),
  INDEX fk_Usuario_has_Reunion_Reunion1_idx (Reunion_idCitas ASC) VISIBLE,
  INDEX fk_Usuario_has_Reunion_Usuario_idx (Usuario_idUsuario ASC) VISIBLE,
  CONSTRAINT fk_Usuario_has_Reunion_Usuario
    FOREIGN KEY (Usuario_idUsuario)
    REFERENCES trabajoangular.Usuario (DniUsuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Usuario_has_Reunion_Reunion1
    FOREIGN KEY (Reunion_idCitas)
    REFERENCES trabajoangular.Reunion (idReunion)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE trabajoangular ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Datos Base
-- -----------------------------------------------------
INSERT INTO trabajoangular.Usuario (DniUsuario, Nombre, Apellido, Mail, Pass, Sexo, Horario, Administrador, Edad, DniTutor, NombreTutor, ApellidoTutor)
VALUES
('12345678A', 'Laura', 'García', 'laura.garcia@mail.com', '$2b$10$wJSef4tMHLoBW5NJ3fDezuQs6p2aY/MfKMMDNItS8mr4gOlt3cDXy', 'M', 'maniana', 'Si', 30, NULL, NULL, NULL),
('87654321B', 'Carlos', 'López', 'carlos.lopez@mail.com', '$2b$10$wJSef4tMHLoBW5NJ3fDezuQs6p2aY/MfKMMDNItS8mr4gOlt3cDXy', 'H', 'tarde', 'No',28, NULL, NULL, NULL),
('23456789C', 'Ana', 'Martínez', 'ana.martinez@mail.com', '$2b$10$wJSef4tMHLoBW5NJ3fDezuQs6p2aY/MfKMMDNItS8mr4gOlt3cDXy', 'M', 'manianaytarde', 'No',16, '98765432D', 'Juan', 'Martínez'),
('98765432D', 'Pedro', 'Gómez', 'pedro.gomez@mail.com', '$2b$10$wJSef4tMHLoBW5NJ3fDezuQs6p2aY/MfKMMDNItS8mr4gOlt3cDXy', 'H', 'maniana', 'No',40, NULL, NULL, NULL),
('34567890E', 'Sofía', 'Pérez', 'sofia.perez@mail.com', '$2b$10$wJSef4tMHLoBW5NJ3fDezuQs6p2aY/MfKMMDNItS8mr4gOlt3cDXy', 'M', 'tarde', 'No',22, NULL, NULL, NULL);

INSERT INTO trabajoangular.Reunion (Nombre, IdUsuario, Estado, Duracion ,Descripccion, Fecha, Hora)
VALUES
('Reunión 1', '12345678A', 'En Progreso', '15min' ,'Descripción de la reunión 1', '2024-02-01', '09:00:00'),
('Reunión 2', '87654321B', 'Completada', '30min' ,'Descripción de la reunión 2', '2024-02-02', '10:00:00'),
('Reunión 3', '23456789C', 'Pendiente', '1hora' ,'Descripción de la reunión 3', '2024-02-03', '11:00:00'),
('Reunión 4', '98765432D', 'En Progreso', '1hora30min' ,'Descripción de la reunión 4', '2024-02-04', '12:00:00'),
('Reunión 5', '34567890E', 'Completada', '2horas' ,'Descripción de la reunión 5', '2024-02-05', '13:00:00');

INSERT INTO trabajoangular.Citas (Nombre, IdUsuario, Estado, Descripccion, Fecha, Hora)
VALUES
('Cita 1', '12345678A', 'En Progreso', 'Descripción de la cita 1', '2024-02-06', '09:00:00'),
('Cita 2', '87654321B', 'Completada', 'Descripción de la cita 2', '2024-02-07', '10:00:00'),
('Cita 3', '23456789C', 'Pendiente', 'Descripción de la cita 3', '2024-02-08', '11:00:00'),
('Cita 4', '98765432D', 'En Progreso', 'Descripción de la cita 4', '2024-02-09', '12:00:00'),
('Cita 5', '34567890E', 'Completada', 'Descripción de la cita 5', '2024-02-10', '13:00:00');

INSERT INTO trabajoangular.Usuario_has_Reunion (Usuario_idUsuario, Reunion_idCitas)
VALUES
('12345678A', 1),
('87654321B', 2),
('23456789C', 3),
('98765432D', 4),
('34567890E', 5);