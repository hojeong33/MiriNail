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
-- Table structure for table `designer_news`
--

DROP TABLE IF EXISTS `designer_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designer_news` (
  `designer_news_seq` bigint NOT NULL AUTO_INCREMENT,
  `designer_seq` bigint NOT NULL COMMENT 'AI',
  `designer_news_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `designer_news_desc` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `designer_news_reged_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `designer_news_img_url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`designer_news_seq`),
  KEY `FK_designer_info_TO_designer_news_1` (`designer_seq`),
  CONSTRAINT `FK_designer_info_TO_designer_news_1` FOREIGN KEY (`designer_seq`) REFERENCES `designer_info` (`designer_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designer_news`
--

LOCK TABLES `designer_news` WRITE;
/*!40000 ALTER TABLE `designer_news` DISABLE KEYS */;
INSERT INTO `designer_news` VALUES (1,5,'오픈공지','부산 강서구 신호동에 위치한 네일샵 영남네일 입니다.\n\n오픈 전부터 많은 관심과 문의 주셔서 정말정말 감사합니다.\n\n영남네일 22년 5월 13일 월요일 오픈입니다!\n(예약은 15일 수요일부터 가능해요 ◡̈ )\n\n오픈 이벤트 한달간 진행 예정입니다.','2022-05-12 18:29:18',NULL),(13,5,'신상공지','봄을 맞이한 신상입니다!\n\n사랑스러운 핑크마블과 실버 반짝임을 가득 담아\n기분좋음을 한가득 선물해 주는 데일리 자석 네일입니다.\n\n지금 바로 예약하세요!','2022-05-13 06:59:57',NULL),(17,6668,'','이번에 새로 나온 신규 네일이예요~\n6월 5일 부터 시술 시작하니 많은 예약 부탁드려요~!','2022-05-18 09:57:15',NULL),(18,6668,'','저희 쥬니 네일은 일요일 마다 정기 휴무 입니다~\n\n잘 확인 하고 예약해 주세요~','2022-05-18 09:58:39',NULL),(19,6668,'','신종 네일아트 3종 나왔습니다~\n\n네일 3종 모두 6/10 일부터 만나볼 수 있습니다~\n\n많은 예약 부탁드립니다!','2022-05-18 10:12:17',NULL),(20,1,'신상 업데이트!!','이번에 새로나온 블루계열 입니다!!!\nAR로 한번 테스트 해보시고 마음에 드시면 예약 해주세요~~','2022-05-19 10:37:26',NULL),(21,1,'오늘 나온 신상!!','오늘 새로 네일이 또 나왔습니다!!!\nAR 체험 해보시고 마음에 드시면 예약 해주세요~~','2022-05-19 14:42:50',NULL),(22,2,'5월 이벤트','5월 이벤트 있습니다!\n모두 참여 많이 부탁드려용!!\n','2022-05-19 22:50:51',NULL),(23,6669,'휴가 공지!','크리스마스 느낌내러 추운나라 잠시 다녀올게요~\n\n- 6월 12일까지 -','2022-05-20 00:45:13',NULL);
/*!40000 ALTER TABLE `designer_news` ENABLE KEYS */;
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
