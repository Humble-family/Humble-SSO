-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema humble-sso
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema humble-sso
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `humble-sso` DEFAULT CHARACTER SET utf8mb4 ;
USE `humble-sso` ;

-- -----------------------------------------------------
-- Table `humble-sso`.`T_AccessToken`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `humble-sso`.`T_AccessToken` (
  `PK_AccessToken` INT(11) NOT NULL AUTO_INCREMENT,
  `accessToken` VARCHAR(100) NOT NULL,
  `expiresAt` INT(11) NOT NULL,
  `scope` VARCHAR(100) NOT NULL,
  `FK_Client` INT(11) NOT NULL,
  `FK_User` INT(11) NOT NULL,
  PRIMARY KEY (`PK_AccessToken`),
  UNIQUE INDEX `accessToken_UNIQUE` (`accessToken` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `humble-sso`.`T_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `humble-sso`.`T_User` (
  `PK_User` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `avatar` LONGTEXT NULL DEFAULT NULL,
  `isAdmin` TINYINT(1) NOT NULL DEFAULT '0',
  `mail` VARCHAR(45) NOT NULL,
  `humblemail` VARCHAR(45) NOT NULL,
  `apps` MEDIUMTEXT NOT NULL,
  `twofa` TINYINT(1) NOT NULL DEFAULT '0',
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`PK_User`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) ,
  UNIQUE INDEX `humblemail_UNIQUE` (`humblemail` ASC) ,
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `humble-sso`.`T_Client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `humble-sso`.`T_Client` (
  `PK_Client` INT(11) NOT NULL AUTO_INCREMENT,
  `redirectUris` VARCHAR(100) NOT NULL,
  `grants` VARCHAR(100) NOT NULL,
  `secret` VARCHAR(100) NOT NULL,
  `FK_User` INT(11) NOT NULL,
  PRIMARY KEY (`PK_Client`),
  INDEX `IDX_User_On_T_Client` (`FK_User` ASC) ,
  CONSTRAINT `FK_User_On_T_Client`
    FOREIGN KEY (`FK_User`)
    REFERENCES `humble-sso`.`T_User` (`PK_User`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `humble-sso`.`T_AuthorizationCode`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `humble-sso`.`T_AuthorizationCode` (
  `PK_AuthorizationCode` INT(11) NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(100) NOT NULL,
  `expiresAt` INT(11) NOT NULL,
  `redirectUri` VARCHAR(100) NULL DEFAULT NULL,
  `scope` VARCHAR(100) NOT NULL,
  `FK_Client` INT(11) NOT NULL,
  `FK_User` INT(11) NOT NULL,
  PRIMARY KEY (`PK_AuthorizationCode`),
  INDEX `IDX_Client_On_T_AuthorizationCode` (`FK_Client` ASC) ,
  INDEX `IDX_User_On_T_AuthorizationCode` (`FK_User` ASC) ,
  CONSTRAINT `FK_Client_On_T_AuthorizationCode`
    FOREIGN KEY (`FK_Client`)
    REFERENCES `humble-sso`.`T_Client` (`PK_Client`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_User_On_T_AuthorizationCode`
    FOREIGN KEY (`FK_User`)
    REFERENCES `humble-sso`.`T_User` (`PK_User`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `humble-sso`.`T_Service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `humble-sso`.`T_Service` (
  `PK_Service` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `url` VARCHAR(45) NOT NULL,
  `color` VARCHAR(7) NOT NULL,
  `logo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`PK_Service`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `humble-sso`.`T_Link`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `humble-sso`.`T_Link` (
  `PK_Link` INT(11) NOT NULL AUTO_INCREMENT,
  `FK_Service` INT(11) NOT NULL,
  `FK_User` INT(11) NOT NULL,
  `scopes` VARCHAR(100) NOT NULL,
  `refreshToken` VARCHAR(100) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PK_Link`),
  INDEX `IDX_Service_On_T_Link` (`FK_Service` ASC) ,
  INDEX `IDX_User_On_T_Link` (`FK_User` ASC) ,
  CONSTRAINT `FK_Service_On_T_Link`
    FOREIGN KEY (`FK_Service`)
    REFERENCES `humble-sso`.`T_Service` (`PK_Service`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_User_On_T_Link`
    FOREIGN KEY (`FK_User`)
    REFERENCES `humble-sso`.`T_User` (`PK_User`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `humble-sso`.`T_RefreshToken`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `humble-sso`.`T_RefreshToken` (
  `PK_RefreshToken` INT(11) NOT NULL AUTO_INCREMENT,
  `refreshToken` VARCHAR(100) NOT NULL,
  `expiresAt` INT(11) NOT NULL,
  `scope` VARCHAR(100) NOT NULL,
  `FK_Client` INT(11) NOT NULL,
  `FK_User` INT(11) NOT NULL,
  PRIMARY KEY (`PK_RefreshToken`),
  UNIQUE INDEX `refreshToken_UNIQUE` (`refreshToken` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

