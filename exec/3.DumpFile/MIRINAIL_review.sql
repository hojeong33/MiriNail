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
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` bigint NOT NULL,
  `designer_seq` bigint NOT NULL,
  `nailart_seq` bigint NOT NULL COMMENT 'AI',
  `review_title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `review_desc` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `review_reged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `review_rating` float NOT NULL DEFAULT '1' COMMENT '1~5점 사이',
  `review_cnt` bigint DEFAULT NULL,
  PRIMARY KEY (`review_seq`),
  KEY `FK_user_TO_review_1` (`user_seq`),
  KEY `FK_nailart_TO_review_1` (`nailart_seq`),
  KEY `FK_designer_info_TO_review_1` (`designer_seq`),
  CONSTRAINT `FK_nailart_TO_review_1` FOREIGN KEY (`nailart_seq`) REFERENCES `nailart` (`nailart_seq`),
  CONSTRAINT `FK_user_TO_review_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`),
  CONSTRAINT `FKtkn4jrtwg66wc7625sqyk9euo` FOREIGN KEY (`designer_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,6669,13,'dummy','이번 시술 너무 만족합니다!!!\r\n너무 예뻐요!!','2022-05-19 11:18:41',5,0),(2,5,6669,13,'dummy','타고남은 나뭇가지가 아니라 진짜 손톱이 탔어요','2022-05-19 13:33:07',3,0),(3,2,6667,12,'dummy','기대 이상으로 인싸 됐어요\r\nI인데 큰일남..ㅎ','2022-05-19 13:52:42',5,0),(4,2,6667,10,'dummy','빨간맛~궁금해 허니이\r\n예상했던 시간보다 오래걸렸지만 만족해요','2022-05-19 13:55:54',4,0),(5,2,6667,3,'dummy','하늘하늘하게 예뻐요\r\n여름네일로 딱인듯해요','2022-05-19 14:45:04',4,0),(6,2,5,15,'dummy','생각했던대로 나왔어요!\r\n맘에 들어용','2022-05-19 15:49:30',4,0),(7,2,1,4,'dummy','요즘에 쓰기 딱 좋은것 같아요~\r\n컬러도 시원해보여서 맘에 들어요','2022-05-19 16:02:34',5,0),(8,2,6669,6,'dummy','요 컬러플레이컬렉션! 정말 사랑이에요\r\n어쩜 이런 맑고 투명한 컬러 표현에 밀착력까지 챙겼을까 싶어요','2022-05-19 16:41:50',5,0),(9,2,1,5,'dummy','넘 예뻐요ㅠㅠㅠㅠㅠ엉엉... 최고...\r\n','2022-05-19 16:44:00',5,0),(10,6667,5,15,'dummy','신세계네요. 너무너무 좋아요. 다음에도 또 하고 싶어요','2022-05-19 17:58:49',3,0),(11,2,6668,19,'dummy','네모 세모~ 만족해용','2022-05-19 20:24:39',5,0),(12,1,2,21,'dummy','평가평가','2022-05-19 23:02:09',5,0),(13,6669,2,21,'dummy','컬러가 너무 이뻐요!','2022-05-19 23:02:19',3,0);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
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
