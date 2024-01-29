-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema trabajoangular
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `trabajoangular` ;

-- -----------------------------------------------------
-- Schema trabajoangular
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trabajoangular` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema trabajoangular
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `trabajoangular` ;

-- -----------------------------------------------------
-- Schema trabajoangular
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trabajoangular` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `trabajoangular` ;

-- -----------------------------------------------------
-- Table `trabajoangular`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trabajoangular`.`Usuario` ;

CREATE TABLE IF NOT EXISTS `trabajoangular`.`Usuario` (
  `DniUsuario` VARCHAR(9) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellido` VARCHAR(45) NOT NULL,
  `Mail` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(1000) NOT NULL,
  `Sexo` ENUM('M', 'H', 'NC') NOT NULL,
  `Horario` ENUM('maniana', 'tarde', 'manianaytarde') NOT NULL,
  `Edad` INT NOT NULL,
  `DniTutor` VARCHAR(9) NULL,
  `NombreTutor` VARCHAR(45) NULL,
  `ApellidoTutor` VARCHAR(45) NULL,
  PRIMARY KEY (`DniUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trabajoangular`.`Reunion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trabajoangular`.`Reunion` ;

CREATE TABLE IF NOT EXISTS `trabajoangular`.`Reunion` (
  `idReunion` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `IdUsuario` VARCHAR(9) NOT NULL,
  `Estado` ENUM('en curso', 'finalizada', 'pendiente') NOT NULL,
  `Descripccion` VARCHAR(500) NULL,
  `Fecha` DATE NOT NULL,
  `Hora` TIME NOT NULL,
  PRIMARY KEY (`idReunion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trabajoangular`.`Citas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trabajoangular`.`Citas` ;

CREATE TABLE IF NOT EXISTS `trabajoangular`.`Citas` (
  `idCitas` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `IdUsuario` VARCHAR(9) NOT NULL,
  `Estado` ENUM('en curso', 'finalizada', 'pendiente') NOT NULL,
  `Descripccion` VARCHAR(500) NULL,
  `Fecha` DATE NOT NULL,
  `Hora` TIME NOT NULL,
  PRIMARY KEY (`idCitas`),
  INDEX `fk1_idx` (`IdUsuario` ASC) VISIBLE,
  CONSTRAINT `fk1`
    FOREIGN KEY (`IdUsuario`)
    REFERENCES `trabajoangular`.`Usuario` (`DniUsuario`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trabajoangular`.`Usuario_has_Reunion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trabajoangular`.`Usuario_has_Reunion` ;

CREATE TABLE IF NOT EXISTS `trabajoangular`.`Usuario_has_Reunion` (
  `Usuario_idUsuario` VARCHAR(9) NOT NULL,
  `Reunion_idCitas` INT NOT NULL,
  PRIMARY KEY (`Usuario_idUsuario`, `Reunion_idCitas`),
  INDEX `fk_Usuario_has_Reunion_Reunion1_idx` (`Reunion_idCitas` ASC) VISIBLE,
  INDEX `fk_Usuario_has_Reunion_Usuario_idx` (`Usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_has_Reunion_Usuario`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `trabajoangular`.`Usuario` (`DniUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_has_Reunion_Reunion1`
    FOREIGN KEY (`Reunion_idCitas`)
    REFERENCES `trabajoangular`.`Reunion` (`idReunion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `trabajoangular` ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
