-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `freetime`
--
UNLOCK TABLES;
CREATE database IF NOT EXISTS test;
use test;

DROP TABLE IF EXISTS `freetime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `freetime` (
  `freetimeID` varchar(8) NOT NULL,
  `startF` datetime DEFAULT NULL,
  `endF` datetime DEFAULT NULL,
  `playerID` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`freetimeID`),
  KEY `freetime_playerID` (`playerID`),
  CONSTRAINT `freetime_playerID` FOREIGN KEY (`playerID`) REFERENCES `player` (`playerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freetime`
--

LOCK TABLES `freetime` WRITE;
/*!40000 ALTER TABLE `freetime` DISABLE KEYS */;
INSERT INTO `freetime` (freetimeID , startF, endF,  playerID)
VALUES ('F001',"2022-12-5 08:00", "2024-5-5 12:00", '12345678'), 
('F002',"2022-06-12 12:00", "2024-06-12 13:00", '23456789'),
('F003',"2021-08-12 12:00", "2023-08-12 12:00", 'V001'),
('F004',"2023-05-01 9:00", "2023-05-01 17:00", '2346789');
/*!40000 ALTER TABLE `freetime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `gameID` varchar(8) NOT NULL,
  `title` varchar(30) DEFAULT NULL,
  `playerID` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`gameID`),
  KEY `game_playerID` (`playerID`),
  CONSTRAINT `game_playerID` FOREIGN KEY (`playerID`) REFERENCES `player` (`playerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` (gameID,title ,playerID)
VALUES ('00000001','Minecraft','12345678'), 
('00000002','Roblox','V001'),
('00000003','Roblox','23456789'),
('00000004','FortNight','12345678'),
('00000005','Starfiled','12345678');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `playerID` varchar(8) NOT NULL,
  `playerType` enum('Patient','Volunteer') DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `inSession` tinyint(1) DEFAULT NULL,
  `onlyOnline` tinyint(1) DEFAULT Null,
  `sessionID` Int DEFAULT NULL,
  PRIMARY KEY (`playerID`),
  KEY `player_sessionID` (`sessionID`),
  CONSTRAINT `player_sessionID` FOREIGN KEY (`sessionID`) REFERENCES `session` (`sessionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` () VALUES ('12345678','Patient','Harry Potter',0,0,NULL),
                            ('23456789', 'Patient','Aslan Alex',1,0,NULL), 
                            ('45367878', 'Volunteer','Adam Grey',0,1,NULL),
                            ('34567822', 'Patient', 'James Bond', 0, 0, NULL),
                            ('65478965', 'Volunteer', 'Mickey Mouse', 0, 0,NULL),
                            ('96485683', 'Patient', 'Hermione Granger', 0, 0, NULL),
                            ('65787876', 'Patient', 'Homer Simpson', 0, 1, NULL),
                            ('62747676', 'Volunteer', 'Albus Dumbledore', 0, 0, NULL),
                            ('35896378', 'Patient', 'Lionel Messi', 0, 0, NULL),
                            ('25346844', 'Patient', 'Cristiano Ronaldo', 0, 0, NULL);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `sessionID` int NOT NULL PRIMARY Key Auto_increment,
  `isOnline` tinyint(1) Not Null,
  `gameID` varchar(8) DEFAULT NULL,
  KEY `session_gameID` (`gameID`),
  CONSTRAINT `session_gameID` FOREIGN KEY (`gameID`) REFERENCES `game` (`gameID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` () VALUES (1,1,"00000001"),
                            (2, 1 ,"00000002"), 
                            (3, 0,"00000001") ;
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

DROP TABLE IF EXISTS `supervisor`;
CREATE TABLE `supervisor` (
  `superID` varchar(8) NOT NULL,
  `name` varchar(30) Not Null,
  `password` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`superID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `playerID` varchar(8) NOT NULL,
  `playerType` enum('Patient','Volunteer') DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `inSession` tinyint(1) DEFAULT NULL,
  `onlyOnline` tinyint(1) DEFAULT Null,
  `sessionID` int DEFAULT NULL,
  PRIMARY KEY (`playerID`),
  KEY `player_sessionID` (`sessionID`),
  CONSTRAINT `player_sessionID` FOREIGN KEY (`sessionID`) REFERENCES `session` (`sessionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` () VALUES ('12345678','Patient','Harry Potter',0,0,'00000001'),
                            ('23456789', 'Patient','Aslan Alex',0,0,'00000002'), 
                            ('V001', 'Volunteer','Adam Grey',0,1,NULL) ;
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--


LOCK TABLES `supervisor` WRITE;
INSERT INTO `supervisor` () VALUES ('A1', "Steve Jobs","password");

UNLOCK TABLES;

DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment` (
  `equipID` varchar(8) NOT NULL,
  `platform` varchar(30) Not Null,
  `available` tinyint(1),
  PRIMARY KEY (`equipID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `equipment` WRITE;
INSERT INTO `equipment` () VALUES ('asdf', "XBOX ONE",1);

UNLOCK TABLES;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-07 21:04:39
