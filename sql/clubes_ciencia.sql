-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jan 11, 2026 at 12:55 PM
-- Server version: 8.0.43
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clubes_ciencia`
--

-- --------------------------------------------------------

--
-- Table structure for table `CLUB`
--

CREATE TABLE `CLUB` (
  `id_club` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_fundacion` date DEFAULT NULL,
  `id_rama` int DEFAULT NULL,
  `presupuesto_anual` decimal(10,2) DEFAULT '0.00',
  `esta_activo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `CLUB`
--

INSERT INTO `CLUB` (`id_club`, `nombre`, `descripcion`, `direccion`, `fecha_fundacion`, `id_rama`, `presupuesto_anual`, `esta_activo`) VALUES
(1, 'Observatorio Lunarrr', 'Observación de cráteres.', 'Calle Luna 1, Madrid, España, eL mUNDO, 3', '2010-05-20', 1, 0.00, 1),
(2, 'Devs Unidos', 'Hackathon mensual.', 'Av. Binaria 01', '2022-01-15', 7, 0.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `RAMA`
--

CREATE TABLE `RAMA` (
  `id_rama` int NOT NULL,
  `nombre_rama` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `RAMA`
--

INSERT INTO `RAMA` (`id_rama`, `nombre_rama`) VALUES
(1, 'Astronomía'),
(2, 'Tecnología'),
(3, 'Biología'),
(4, 'Física'),
(5, 'Química'),
(6, 'Matemática'),
(7, 'Informática'),
(8, 'Geología'),
(9, 'Zoológica'),
(10, 'Botánica');

-- --------------------------------------------------------

--
-- Table structure for table `SOCIO`
--

CREATE TABLE `SOCIO` (
  `id_socio` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `id_club` int DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `altura_metros` decimal(3,2) DEFAULT NULL,
  `ha_pagado_cuota` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `SOCIO`
--

INSERT INTO `SOCIO` (`id_socio`, `nombre`, `apellido`, `email`, `id_club`, `fecha_nacimiento`, `altura_metros`, `ha_pagado_cuota`) VALUES
(1, 'Ana', 'López', 'ana@mail.com', 1, NULL, NULL, 0),
(2, 'Luis', 'Ramos', 'luis@mail.com', 2, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CLUB`
--
ALTER TABLE `CLUB`
  ADD PRIMARY KEY (`id_club`),
  ADD KEY `fk_club_rama` (`id_rama`);

--
-- Indexes for table `RAMA`
--
ALTER TABLE `RAMA`
  ADD PRIMARY KEY (`id_rama`);

--
-- Indexes for table `SOCIO`
--
ALTER TABLE `SOCIO`
  ADD PRIMARY KEY (`id_socio`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_socio_club` (`id_club`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CLUB`
--
ALTER TABLE `CLUB`
  MODIFY `id_club` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `RAMA`
--
ALTER TABLE `RAMA`
  MODIFY `id_rama` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `SOCIO`
--
ALTER TABLE `SOCIO`
  MODIFY `id_socio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CLUB`
--
ALTER TABLE `CLUB`
  ADD CONSTRAINT `fk_club_rama` FOREIGN KEY (`id_rama`) REFERENCES `RAMA` (`id_rama`);

--
-- Constraints for table `SOCIO`
--
ALTER TABLE `SOCIO`
  ADD CONSTRAINT `fk_socio_club` FOREIGN KEY (`id_club`) REFERENCES `CLUB` (`id_club`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
