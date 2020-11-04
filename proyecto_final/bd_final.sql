-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `bd_final`;
CREATE DATABASE `bd_final` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bd_final`;

DROP TABLE IF EXISTS `alumnos`;
CREATE TABLE `alumnos` (
  `nombre` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `curso` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dni` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `login_username` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`dni`,`login_username`),
  KEY `fk_alumnos_login1_idx` (`login_username`),
  CONSTRAINT `fk_alumnos_login1` FOREIGN KEY (`login_username`) REFERENCES `login` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `alumnos` (`nombre`, `apellido`, `curso`, `dni`, `login_username`, `email`) VALUES
('Mario',	'Jove',	'1',	'221',	'mjove',	NULL),
('Ricardo',	'García',	'2',	'222',	'rgarcia',	NULL),
('Lucas',	'Perez',	'3',	'223',	'lperez',	NULL),
('Santiago',	'Sosa',	'3',	'224',	'ssosa',	NULL),
('Camilo',	'Perez',	'4',	'225',	'cperez',	NULL),
('Federico',	'Lopez',	'4',	'226',	'flopez',	NULL);

DROP TABLE IF EXISTS `alumnos_has_materias`;
CREATE TABLE `alumnos_has_materias` (
  `alumnos_dni` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `alumnos_login_username` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `materias_id_materia` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `materias_docentes_dni` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`alumnos_dni`,`alumnos_login_username`,`materias_id_materia`,`materias_docentes_dni`),
  KEY `fk_alumnos_has_materias_materias1_idx` (`materias_id_materia`,`materias_docentes_dni`),
  KEY `fk_alumnos_has_materias_alumnos1_idx` (`alumnos_dni`,`alumnos_login_username`),
  CONSTRAINT `fk_alumnos_has_materias_alumnos1` FOREIGN KEY (`alumnos_dni`, `alumnos_login_username`) REFERENCES `alumnos` (`dni`, `login_username`),
  CONSTRAINT `fk_alumnos_has_materias_materias1` FOREIGN KEY (`materias_id_materia`, `materias_docentes_dni`) REFERENCES `materias` (`id_materia`, `docentes_dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `alumnos_has_materias` (`alumnos_dni`, `alumnos_login_username`, `materias_id_materia`, `materias_docentes_dni`) VALUES
('222',	'rgarcia',	'bio2',	'114'),
('223',	'lperez',	'bio3',	'115'),
('224',	'ssosa',	'bio3',	'115'),
('225',	'cperez',	'bio4',	'115'),
('226',	'flopez',	'bio4',	'115'),
('222',	'rgarcia',	'geo2',	'116'),
('223',	'lperez',	'geo3',	'116'),
('224',	'ssosa',	'geo3',	'116'),
('225',	'cperez',	'geo4',	'116'),
('226',	'flopez',	'geo4',	'116'),
('221',	'mjove',	'ing1',	'113'),
('222',	'rgarcia',	'ing2',	'113'),
('223',	'lperez',	'ing3',	'113'),
('224',	'ssosa',	'ing3',	'113'),
('225',	'cperez',	'ing4',	'113'),
('226',	'flopez',	'ing4',	'113'),
('221',	'mjove',	'mat1',	'111'),
('222',	'rgarcia',	'mat2',	'112'),
('223',	'lperez',	'mat3',	'111'),
('224',	'ssosa',	'mat3',	'111'),
('225',	'cperez',	'mat4',	'112'),
('226',	'flopez',	'mat4',	'112');

DROP TABLE IF EXISTS `calificaciones`;
CREATE TABLE `calificaciones` (
  `idcalificaciones` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `materias_id_materia` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `materias_docentes_dni` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idcalificaciones`,`materias_id_materia`,`materias_docentes_dni`),
  KEY `fk_calificaciones_materias1_idx` (`materias_id_materia`,`materias_docentes_dni`),
  CONSTRAINT `fk_calificaciones_materias1` FOREIGN KEY (`materias_id_materia`, `materias_docentes_dni`) REFERENCES `materias` (`id_materia`, `docentes_dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `calificaciones` (`idcalificaciones`, `nombre`, `materias_id_materia`, `materias_docentes_dni`) VALUES
(1,	'TP n°1',	'mat1',	'111'),
(2,	'Evaluación Geografia',	'geo2',	'116');

DROP TABLE IF EXISTS `docentes`;
CREATE TABLE `docentes` (
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dni` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `login_username` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `domicilio` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `telefono` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `direccion` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`dni`,`login_username`),
  KEY `fk_docentes_login1_idx` (`login_username`),
  CONSTRAINT `fk_docentes_login1` FOREIGN KEY (`login_username`) REFERENCES `login` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `docentes` (`nombre`, `apellido`, `dni`, `login_username`, `domicilio`, `telefono`, `direccion`, `email`) VALUES
('Matías',	'Garnica',	'111',	'mgarnica',	NULL,	NULL,	NULL,	NULL),
('Matias',	'Perez',	'112',	'mperez',	NULL,	NULL,	NULL,	NULL),
('Juan',	'Pérez',	'113',	'jperez',	NULL,	NULL,	NULL,	NULL),
('Lautaro',	'Ramirez',	'114',	'lramirez',	NULL,	NULL,	NULL,	NULL),
('Carlos',	'Garcia',	'115',	'cgarcia',	NULL,	NULL,	NULL,	NULL),
('Roberto',	'Lopez',	'116',	'rlopez',	NULL,	NULL,	NULL,	NULL);

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `idrol` int(11) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `login` (`username`, `password`, `idrol`) VALUES
('cgarcia',	'1234',	1),
('cperez',	'1234',	2),
('flopez',	'1234',	2),
('jperez',	'1234',	1),
('lperez',	'1234',	2),
('lramirez',	'1234',	1),
('mgarnica',	'1234',	1),
('mjove',	'1234',	2),
('mperez',	'1234',	1),
('rgarcia',	'1234',	2),
('rlopez',	'1234',	1),
('ssosa',	'1234',	2);

DROP TABLE IF EXISTS `materias`;
CREATE TABLE `materias` (
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `año` int(11) NOT NULL,
  `id_materia` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `docentes_dni` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_materia`,`docentes_dni`),
  KEY `fk_materias_docentes1_idx` (`docentes_dni`),
  CONSTRAINT `fk_materias_docentes1` FOREIGN KEY (`docentes_dni`) REFERENCES `docentes` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `materias` (`nombre`, `año`, `id_materia`, `docentes_dni`) VALUES
('Biología 2do',	2,	'bio2',	'114'),
('Biología 3ro',	3,	'bio3',	'115'),
('Biología 4to',	4,	'bio4',	'115'),
('Geografía 2do',	2,	'geo2',	'116'),
('Geografía 3ro',	3,	'geo3',	'116'),
('Geografía 4to',	4,	'geo4',	'116'),
('Inglés 1ro',	1,	'ing1',	'113'),
('Inglés 2do',	2,	'ing2',	'113'),
('Inglés 3ro',	3,	'ing3',	'113'),
('Inglés 4to',	4,	'ing4',	'113'),
('Matemática 1ro',	1,	'mat1',	'111'),
('Matemática 2do',	2,	'mat2',	'112'),
('Matemática 3ro',	3,	'mat3',	'111'),
('Matemática 4to',	4,	'mat4',	'112');

DROP TABLE IF EXISTS `puntajes`;
CREATE TABLE `puntajes` (
  `nota` int(11) NOT NULL,
  `alumnos_dni` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `alumnos_login_username` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `calificaciones_idcalificaciones` int(11) NOT NULL,
  `calificaciones_materias_id_materia` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `calificaciones_materias_docentes_dni` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`nota`,`alumnos_dni`,`alumnos_login_username`,`calificaciones_idcalificaciones`,`calificaciones_materias_id_materia`,`calificaciones_materias_docentes_dni`),
  KEY `fk_puntajes_alumnos1_idx` (`alumnos_dni`,`alumnos_login_username`),
  KEY `fk_puntajes_calificaciones1_idx` (`calificaciones_idcalificaciones`,`calificaciones_materias_id_materia`,`calificaciones_materias_docentes_dni`),
  CONSTRAINT `fk_puntajes_alumnos1` FOREIGN KEY (`alumnos_dni`, `alumnos_login_username`) REFERENCES `alumnos` (`dni`, `login_username`),
  CONSTRAINT `fk_puntajes_calificaciones1` FOREIGN KEY (`calificaciones_idcalificaciones`, `calificaciones_materias_id_materia`, `calificaciones_materias_docentes_dni`) REFERENCES `calificaciones` (`idcalificaciones`, `materias_id_materia`, `materias_docentes_dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `puntajes` (`nota`, `alumnos_dni`, `alumnos_login_username`, `calificaciones_idcalificaciones`, `calificaciones_materias_id_materia`, `calificaciones_materias_docentes_dni`) VALUES
(8,	'221',	'mjove',	1,	'mat1',	'111'),
(10,	'222',	'rgarcia',	2,	'geo2',	'116');

-- 2020-11-04 21:46:29
