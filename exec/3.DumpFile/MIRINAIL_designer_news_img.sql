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
-- Table structure for table `designer_news_img`
--

DROP TABLE IF EXISTS `designer_news_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designer_news_img` (
  `designer_news_img_seq` bigint NOT NULL AUTO_INCREMENT,
  `designer_news_seq` bigint NOT NULL,
  `designer_news_img_url` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`designer_news_img_seq`),
  KEY `FK_designer_news_TO_designer_news_img_1_idx` (`designer_news_seq`),
  CONSTRAINT `FK_designer_news_TO_designer_news_img_1` FOREIGN KEY (`designer_news_seq`) REFERENCES `designer_news` (`designer_news_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designer_news_img`
--

LOCK TABLES `designer_news_img` WRITE;
/*!40000 ALTER TABLE `designer_news_img` DISABLE KEYS */;
INSERT INTO `designer_news_img` VALUES (1,1,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/79402ad5-3d6a-4d74-ac8f-9889af2bd937.png'),(13,13,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/15c4b4c7-b7f0-4d72-80cd-bf2a16bb0b12.png'),(16,17,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/b8714d1e-a20d-410d-857d-248df6a911c7.png'),(17,18,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/12075e7b-a49a-4c2e-8d88-2d96fa0e9042.png'),(18,19,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/14862a7c-c4c9-4b37-8adb-b939e17c7797.png'),(19,19,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/bc7fd076-2e82-476a-9272-80efae1c7686.png'),(20,19,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/815332fb-9a11-4917-8ef1-3a607e5e4fb2.png'),(21,20,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/4ecbbbc0-9487-4fbf-b5db-2e01703875dd.jpg'),(22,21,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/b4c656d8-5a33-489f-99c7-0042a9ac4fac.jpg'),(23,22,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/81b93fcd-fab9-4a09-b066-8630be0dca72.jpg'),(24,23,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/6bfbde59-6275-49ab-ab66-811a6ec43db2.jpg');
/*!40000 ALTER TABLE `designer_news_img` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:56:55
