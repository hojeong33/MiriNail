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
-- Table structure for table `review_img`
--

DROP TABLE IF EXISTS `review_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_img` (
  `review_Img_seq` bigint NOT NULL AUTO_INCREMENT,
  `review_seq` bigint NOT NULL COMMENT 'AI',
  `review_img_url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`review_Img_seq`),
  KEY `FK_review_TO_review_img_1` (`review_seq`),
  CONSTRAINT `FK_review_TO_review_img_1` FOREIGN KEY (`review_seq`) REFERENCES `review` (`review_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_img`
--

LOCK TABLES `review_img` WRITE;
/*!40000 ALTER TABLE `review_img` DISABLE KEYS */;
INSERT INTO `review_img` VALUES (1,1,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/d86c3850-4964-4d1c-b682-c118a58c42d2.jpg'),(2,2,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/6b100a6d-bf0e-4911-a522-e8bf3e8a72cf.jpg'),(3,3,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/41772baf-87c8-4fbe-b44b-f9870e6cd87f.jpg'),(4,4,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/05c071a3-e1e1-4495-a63e-c955c9f031a4.png'),(5,5,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/41b8d3ec-c996-4d52-a6d4-adc4efddae62.png'),(6,6,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/787a60f8-304a-4f7d-b99d-fdd5abd88a06.png'),(7,7,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/ac3a8202-3918-4a38-b134-bc803abb3e3a.png'),(8,8,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/8f72ee11-342e-4756-bebc-0c350674b560.jpg'),(9,9,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/a8c0e817-85b1-4d95-a767-50681e448765.jpg'),(10,10,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/b91c9940-6eaa-4576-9a06-47af28f0742a.jpg'),(11,11,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/7fe72fae-6b79-4e67-8e19-3be8592af37f.jpg'),(12,12,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/f1ece837-06ab-4858-93f5-5ba1daac14e9.png'),(13,13,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/c5536d12-5764-477c-9502-bf3b48c758c3.jpg');
/*!40000 ALTER TABLE `review_img` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:56:50
