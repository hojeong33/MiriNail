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
-- Table structure for table `community_comment`
--

DROP TABLE IF EXISTS `community_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_comment` (
  `community_comment_seq` bigint NOT NULL AUTO_INCREMENT,
  `community_seq` bigint NOT NULL COMMENT 'AI',
  `user_seq` bigint NOT NULL COMMENT 'AI',
  `community_comment_desc` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `community_group_num` bigint DEFAULT NULL,
  `community_comment_layer` int DEFAULT NULL,
  `community_comment_reged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `community_comment_is_delete` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`community_comment_seq`),
  KEY `FK_community_TO_community_comment_1` (`community_seq`),
  KEY `FK_user_TO_community_comment_1` (`user_seq`),
  CONSTRAINT `FK_community_TO_community_comment_1` FOREIGN KEY (`community_seq`) REFERENCES `community` (`community_seq`),
  CONSTRAINT `FK_user_TO_community_comment_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_comment`
--

LOCK TABLES `community_comment` WRITE;
/*!40000 ALTER TABLE `community_comment` DISABLE KEYS */;
INSERT INTO `community_comment` VALUES (1,3,2,'반가워요!!!!',1,2,'2022-05-13 10:34:26',_binary '\0'),(2,4,5,'저는 첫번째가 나은것 같아요!',2,2,'2022-05-13 10:47:41',_binary '\0'),(3,3,1,'삭제된 댓글입니다.',1,3,'2022-05-13 10:59:56',_binary ''),(4,4,1,'저는 세번째요',1,3,'2022-05-13 11:01:34',_binary '\0'),(5,4,1,'저는 세번째요',5,2,'2022-05-13 11:02:04',_binary '\0'),(6,6,1,'답글 달고싶다..',6,2,'2022-05-13 15:04:28',_binary '\0'),(7,4,1,'답글이랑 댓글이랑 차이점이 무엇인가요?',2,3,'2022-05-13 15:05:17',_binary '\0'),(9,2,6669,'반가워요~~ 저도 처음 받아보고 너무 마음에 들어서 정보얻으려고 가입했어요~~',9,1,'2022-05-13 15:58:12',_binary '\0'),(10,6,6669,'답글 갑사합니다~',6,3,'2022-05-13 15:58:51',_binary '\0'),(11,6,5,'강서구 신호동에 잘하는 네일샵 있는데 가보실래요??',11,1,'2022-05-13 16:03:21',_binary '\0'),(12,4,2,'세번째로 결정 !ㅎ',5,3,'2022-05-14 20:48:14',_binary '\0'),(13,6,5,'나도 달고싶다',6,3,'2022-05-15 17:30:50',_binary '\0'),(14,7,5,'오히려 프렌치네일의 느낌이 나서 보기 좋은것 같아요!!',14,1,'2022-05-16 14:12:55',_binary '\0'),(15,9,6670,'삭제된 댓글입니다.',15,1,'2022-05-17 10:53:18',_binary ''),(16,7,2,'저랑 같은 고민이네여ㅜ',16,1,'2022-05-17 16:11:44',_binary '\0'),(17,13,5,'좀 맛있어 보이긴 하네요',17,1,'2022-05-17 16:36:19',_binary '\0'),(18,9,6669,'뭐라고 댓글 달았었냥????',18,1,'2022-05-17 16:38:25',_binary '\0'),(19,11,5,'캬~~ 저도 어제 네일했는데 오늘 코젤한잔 해야겠네요!',19,2,'2022-05-17 16:42:28',_binary '\0'),(20,12,6669,'난 연어~ ',20,1,'2022-05-17 16:43:21',_binary '\0'),(21,21,5,'ㄹㅈㄷ',21,1,'2022-05-17 17:12:21',_binary '\0'),(22,13,6669,'오늘 베라 달린다.. 후.. ',22,2,'2022-05-17 17:59:43',_binary '\0'),(23,10,6669,'누구누구~~~?? 누우우우우우구우우우???',23,1,'2022-05-17 18:06:21',_binary '\0'),(24,23,2,'다이소 ㄱㄱ',24,1,'2022-05-17 23:37:20',_binary '\0'),(25,26,2,'이상이',25,2,'2022-05-17 23:37:48',_binary '\0'),(26,3,1,'반갑습니다',26,1,'2022-05-18 23:03:08',_binary '\0'),(27,26,5,'ㅇㅂㄷ',25,3,'2022-05-19 10:23:24',_binary '\0'),(28,9,2,'너무 귀여워여~~~',28,1,'2022-05-19 17:45:26',_binary '\0'),(29,8,2,'배고프다,,',29,1,'2022-05-19 17:45:42',_binary '\0'),(30,13,2,'베라 최애맛 3가지 먼가여?',22,3,'2022-05-19 17:47:12',_binary '\0'),(31,16,2,'우와 예뻐요!',31,1,'2022-05-19 22:24:24',_binary '\0'),(32,22,2,'우와 예뻐요~~~!!!',32,1,'2022-05-19 22:28:31',_binary '\0'),(33,28,5,'곰이다',33,1,'2022-05-20 00:06:29',_binary '\0'),(34,23,1,'다이소 가즈아~',34,1,'2022-05-20 00:06:44',_binary '\0'),(35,11,2,'완전 맛있어요!!!',19,3,'2022-05-20 00:08:01',_binary '\0');
/*!40000 ALTER TABLE `community_comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:56:53
