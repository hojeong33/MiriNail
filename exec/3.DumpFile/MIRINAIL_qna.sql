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
-- Table structure for table `qna`
--

DROP TABLE IF EXISTS `qna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna` (
  `qna_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` bigint NOT NULL COMMENT 'AI',
  `qna_title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `qna_desc` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `qna_Img_url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `qna_designer_seq` bigint DEFAULT NULL,
  `qna_nailart_seq` bigint DEFAULT NULL,
  `qna_is_answered` bit(1) NOT NULL DEFAULT b'0',
  `qna_is_privated` bit(1) DEFAULT b'0' COMMENT 'false : 공개, true : 비공개',
  `qna_type` tinyint DEFAULT NULL,
  `qna_reged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`qna_seq`),
  KEY `FK_user_TO_qna_1` (`user_seq`),
  CONSTRAINT `FK_user_TO_qna_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna`
--

LOCK TABLES `qna` WRITE;
/*!40000 ALTER TABLE `qna` DISABLE KEYS */;
INSERT INTO `qna` VALUES (28,5,'협업문의입니다.','안녕하세요 저희 나미네일과 콜라보로 네일 신상 내는거 어떠신지..?\n괜찮은 아이디어가 있어서 문의드립니다\n관심있으시면 나미네일로 연락바랍니다.',NULL,1,NULL,_binary '\0',_binary '\0',2,'2022-05-19 14:46:41'),(29,2,'색상문의','장마철에 하고 싶은데 좀 더 흐린느낌 강조할수 있나요?','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0b65230e-84a0-42df-8ee1-f6f3f1dcf48c.png',1,5,_binary '',_binary '',3,'2022-05-19 14:51:00'),(30,6669,'개인 커스텀 따로 해주시나요???','기존 디자인에서 조금씩 수정하고 싶은데 커스텀 따로 가능한지랑 추가비용 있는지 궁금해요..!',NULL,1,NULL,_binary '',_binary '\0',1,'2022-05-19 14:57:26'),(31,1,'주부습진이 있습니다.','제가 주부습진이 있는데 네일 가능할까요??','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/f0d546e2-ad75-4b9a-858a-a58f5a791a35.jpg',2,21,_binary '',_binary '\0',3,'2022-05-19 23:00:46'),(32,5,'무늬 변경 무늬드립니다.','세잎말고 네잎클로버로 해줄 수 있나요','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/41bf08bb-4976-4896-9d79-74083050a431.jpg',2,21,_binary '',_binary '',3,'2022-05-19 23:01:11'),(33,6669,'컬러 변경 문의 드립니다!','같은 디자인에 그린컬러 말고 첨부한 사진의 쨍한 블루로 하고 싶은데 가능할까요?','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/306528d5-9d87-43fe-b790-5c6b60571940.jpg',2,21,_binary '',_binary '\0',3,'2022-05-19 23:01:12');
/*!40000 ALTER TABLE `qna` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:56:58
