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
-- Table structure for table `nailart_img`
--

DROP TABLE IF EXISTS `nailart_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nailart_img` (
  `nailart_img_seq` bigint NOT NULL AUTO_INCREMENT,
  `nailart_seq` bigint NOT NULL COMMENT 'AI',
  `nailart_img_url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT 'No Image' COMMENT '작품이미지 URL',
  PRIMARY KEY (`nailart_img_seq`),
  KEY `FK_nailart_TO_nailart_img_1` (`nailart_seq`),
  CONSTRAINT `FK_nailart_TO_nailart_img_1` FOREIGN KEY (`nailart_seq`) REFERENCES `nailart` (`nailart_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nailart_img`
--

LOCK TABLES `nailart_img` WRITE;
/*!40000 ALTER TABLE `nailart_img` DISABLE KEYS */;
INSERT INTO `nailart_img` VALUES (1,1,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/a194aa16-2e63-43ae-81b7-c7edc5365419.png'),(2,2,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/3520f4a8-0828-4c42-a033-d85c62c8fef7.png'),(3,3,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/7dc52f44-1c24-4764-acec-c3a9f42999ae.png'),(4,4,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/fa1e99a2-2c27-4c10-98e5-f11d5a5562d0.png'),(5,5,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/b22c37fb-13d2-4e9c-a5df-841f88640ecd.png'),(6,6,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/a144830e-b3f8-420c-9e78-161a626f577d.png'),(7,7,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/74b68b02-d864-4386-8f08-b03e509b10b6.png'),(8,8,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/413ca09d-3021-45fa-9feb-787698cfa059.png'),(9,9,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/d0dd557b-7dfe-444e-b5c7-0ba5d9949d75.PNG'),(10,10,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0f3c286f-9a1f-47fe-ac34-dfdaeab0e974.png'),(11,11,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/55ddf38f-b3bc-479e-86ee-fccdd75d85ba.png'),(12,12,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/62bef8fb-5bb1-401c-bf5e-75e63db0c17b.png'),(13,13,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/616866f3-fe55-4433-85c6-8e0b6a8d8a65.png'),(14,14,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/349d9cfd-b3d2-450a-a1d0-462331d87c91.png'),(15,15,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/d5e3616e-30c6-4015-b6d1-8b0eea48dcc7.png'),(16,16,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/d01acc44-885e-4fce-8b24-4957dc538cdc.png'),(17,17,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/968e9957-f4ed-4673-ac87-3bc6797edfb8.png'),(18,18,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/a7e62fef-99d5-4449-9f32-efb55d937109.png'),(19,19,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/8c099cd3-d313-4edb-afd9-94d95cea3572.png'),(20,20,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/e2b9c582-b996-433f-bf59-493cac49161a.png'),(21,21,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/930a60dd-6eef-49e5-9a22-2819d78e83b9.png'),(22,22,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/e18b6ab9-86a6-4580-8139-d15fcb990806.png'),(24,24,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/53b5e990-1b85-498d-8dd1-21ac97e1ba7b.png'),(25,23,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/7317ee13-2477-47ad-89e3-090d9eb19df9.png'),(26,25,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/fa5b573b-e3e9-4696-89ca-5db338d371d1.png'),(27,26,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/c322ce24-156a-49e5-9f64-a2631c9e9e1d.png');
/*!40000 ALTER TABLE `nailart_img` ENABLE KEYS */;
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
