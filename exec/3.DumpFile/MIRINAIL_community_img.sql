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
-- Table structure for table `community_img`
--

DROP TABLE IF EXISTS `community_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_img` (
  `community_img_seq` bigint NOT NULL AUTO_INCREMENT,
  `community_seq` bigint NOT NULL COMMENT 'AI',
  `community_img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`community_img_seq`),
  KEY `FK_community_TO_community_img_1` (`community_seq`),
  CONSTRAINT `FK_community_TO_community_img_1` FOREIGN KEY (`community_seq`) REFERENCES `community` (`community_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_img`
--

LOCK TABLES `community_img` WRITE;
/*!40000 ALTER TABLE `community_img` DISABLE KEYS */;
INSERT INTO `community_img` VALUES (2,2,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/aca2508b-e79b-4978-abe0-83474df11125.jpg'),(3,3,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/85571b67-dd34-4257-84e6-aa166dc76688.jpg'),(4,4,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/71a06be6-c985-4a11-a479-59c52a1da5ba.png'),(5,4,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/4e9722e5-c57b-4b3c-99f9-4da47eb354b4.jpg'),(7,6,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/d52787c7-0621-4d12-b324-edf94899adab.jpg'),(8,6,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/f3f39444-10d6-4073-a19a-c01d9d3c3124.jpg'),(9,6,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/59172ec7-5f8c-4594-a543-0c7e7f796c1d.jpg'),(10,6,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0c0a794c-0071-40b0-9d4e-ca09ecfb7c9b.jpg'),(11,6,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/9705e381-44cf-4ab4-b8d9-7014a69d8546.jpg'),(12,7,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0d0aa288-2e88-4546-86bf-5179cb9682cd.jpeg'),(13,8,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/db736eef-74ac-4e44-8101-c1bf7b6e7126.jpeg'),(14,8,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/e327fbcf-a4a3-4dbd-ba68-b8036cbac16d.jpeg'),(15,9,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/42cabcdf-b421-4e8b-b63e-6efed7fd17ac.jpeg'),(16,9,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/148f1927-37da-4c9e-bad1-534e00b7556f.jpeg'),(17,9,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/87ac6695-72a9-4314-ae86-70383488840f.jpeg'),(18,10,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/fa62999a-4dc4-4372-ad26-fc32c7e968ad.png'),(19,11,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/20cfd4c3-a5f6-4728-9e6b-74bd3dae3d4c.jpg'),(20,12,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/96023b3b-67d8-43b0-8ff1-6a3704bd3601.png'),(21,13,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/665a1127-6c6a-4fc7-8987-985c3ccb0f34.png'),(22,13,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/f8e26fee-c5be-4a04-b872-5d6b9ce7af75.png'),(25,16,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/9e7cbdd0-34e3-4678-a773-9c7faddf0903.jpg'),(26,17,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/df169364-9cf2-4d30-a303-2695f797068f.jpg'),(27,18,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/ad994376-d6d8-4fd4-8e88-50f59d5f21d7.png'),(28,19,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/6f15c740-3673-44f8-9237-2f411bb1dbd9.jpg'),(29,20,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/57df4e83-6e31-4b5c-b4e1-463eca912df4.jpg'),(30,21,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/3b5d5465-641a-4371-aab7-c474a5bea634.png'),(31,22,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/3705a0e4-a37c-41cf-a659-c20431d8de6a.jpg'),(32,23,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/eecb8ea4-9b2e-4d58-80aa-91e543f5cdfb.jpg'),(34,25,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/3200f75f-7f9b-49c1-9cd0-3747a9e78a2d.png'),(35,25,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/fc8e966a-6b81-45bb-9717-ff71844c718b.png'),(36,26,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/3db8045a-90bd-4d6a-8bcb-defc87478801.jpg'),(39,28,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/050d35b9-08a3-4b20-bfc1-0000371dbca8.png');
/*!40000 ALTER TABLE `community_img` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:56:51
