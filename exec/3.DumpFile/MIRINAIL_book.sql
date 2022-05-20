CREATE DATABASE  IF NOT EXISTS `MIRINAIL` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `MIRINAIL`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: mirinail.com    Database: MIRINAIL
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` bigint DEFAULT NULL COMMENT 'AI',
  `designer_seq` bigint DEFAULT NULL COMMENT 'AI',
  `nailart_seq` bigint DEFAULT NULL COMMENT 'AI',
  `book_datetime` datetime NOT NULL,
  `book_comment` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `book_reged_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_seq`),
  KEY `FK_user_TO_book_1` (`user_seq`),
  KEY `FK_designer_info_TO_book_1` (`designer_seq`),
  KEY `FK_nailart_TO_book_1` (`nailart_seq`),
  CONSTRAINT `FK_designer_info_TO_book_1` FOREIGN KEY (`designer_seq`) REFERENCES `designer_info` (`designer_seq`),
  CONSTRAINT `FK_nailart_TO_book_1` FOREIGN KEY (`nailart_seq`) REFERENCES `nailart` (`nailart_seq`),
  CONSTRAINT `FK_user_TO_book_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,5,1,5,'2022-05-20 01:30:00','','2022-05-19 14:18:11'),(2,5,1,7,'2022-05-28 01:30:00','','2022-05-19 14:19:13'),(3,2,1,4,'2022-05-25 19:30:00','젤 제거 필요합니다!','2022-05-19 14:53:55'),(4,5,1,18,'2022-05-20 02:00:00','이쁘게해주세요','2022-05-19 15:21:03'),(5,6667,6668,20,'2022-05-20 19:00:00','10분 정도 늦을 수 있어요.','2022-05-19 21:57:44'),(6,1,6668,20,'2022-05-22 00:00:00','예약예약','2022-05-19 23:06:09'),(7,5,1,18,'2022-05-28 04:00:00','','2022-05-19 23:46:41'),(8,5,1,7,'2022-05-28 01:00:00','','2022-05-19 23:47:06'),(9,6669,1,4,'2022-05-28 00:00:00','사장님 잘한다는 소문듣고 예약합니다! 잘 부탁드립니다! ','2022-05-19 23:47:15'),(10,5,1,5,'2022-05-27 19:30:00','','2022-05-19 23:47:27'),(11,6669,1,7,'2022-05-27 22:30:00','친구 데려갑니다~~~','2022-05-19 23:48:03'),(12,5,1,7,'2022-05-28 00:30:00','','2022-05-19 23:48:19'),(13,5,1,18,'2022-05-22 02:30:00','','2022-05-19 23:48:41'),(14,5,1,7,'2022-05-23 23:30:00','','2022-05-19 23:48:49'),(15,5,1,18,'2022-05-25 02:30:00','','2022-05-19 23:49:11'),(16,5,1,18,'2022-05-21 03:30:00','','2022-05-19 23:50:05'),(17,2,1,18,'2022-05-27 01:30:00','젤 제거 필요합니다','2022-05-20 00:20:59'),(19,6667,1,23,'2022-05-20 19:00:00','','2022-05-20 01:56:35'),(20,1,6667,3,'2022-05-29 19:30:00','기깔나게 멋지게 해주세요!!!','2022-05-20 09:42:24');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:56:54
