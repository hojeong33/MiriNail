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
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community` (
  `community_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` bigint NOT NULL COMMENT 'AI',
  `community_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `community_desc` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `community_cnt` bigint DEFAULT NULL,
  `community_reged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`community_seq`),
  KEY `FK_user_TO_community_1` (`user_seq`),
  CONSTRAINT `FK_user_TO_community_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
INSERT INTO `community` VALUES (2,2,'가입인사!!','안녕하세요33\r\n오늘 가입했어요~\r\n요즘 네일에 관심생겼는데 어떤게 저랑 어울리는지 모르겠더라구요\r\n그래서 미리네일에서 가상착용도 해보고 예약까지 하려고 가입했어요!\r\n소통 페이지도 있어서 네일 정보 공유하기에도 좋네요\r\n그럼 이만~~',60,'2022-05-12 17:54:53'),(3,6669,'첫 네일 도전하기전이에요! ','친구가 받았는데 너무 이뻐서 저도 해보려고 정보 얻으러 왔습니다!\r\n',47,'2022-05-12 20:30:06'),(4,2,'네일 골라주세요@','둘 중에 고민됩니다!!\r\n가상피팅해봤는데 둘 다 이뻐서...\r\n골라주세요~',130,'2022-05-13 09:56:31'),(6,6669,'이번에는 뭐해볼지 고민이에요~ ','갑자기 네일에 푹빠져서 시간될 때마다 받으려고 하는데 이번에는 뭐해볼지 고민이에요~~',92,'2022-05-13 14:37:15'),(7,6669,'손톱이 너무 빨리 자라요 ㅠㅠ','이 정도면 다시 해야할까요?? 다른분들은 어떻게 생각하세요...??',18,'2022-05-16 13:58:08'),(8,6669,'Nail For U 옆에 카논치니 맛집있어요!!! 다들 꼭 드시길!!~','Nail For U에서 네일받고 조금만 걸어나오니까 엄청 분위기 좋은 카페가 있더라구요!  들어가서 먹었는데 ... 너무... 최고..ㅜㅜ 카논치니 처음먹어봤는데 꼭 드세요..!! ',14,'2022-05-16 14:22:09'),(9,6669,'내 손톱도 네일 가능하냥?','이쁘게 해달라냥 :)',36,'2022-05-16 14:31:51'),(10,5,'네일 썸녀랑 커피마시기로 했어요!!','필살기로 네일아트하려고 하는데 어디서 할지 추천좀 해주세요!!',21,'2022-05-16 14:48:47'),(11,2,'네일하고 마시는 코오오젤','오늘은 제대로 힐링했어요 ㅎㅎㅎ\r\n네 자랑입니다',19,'2022-05-17 14:59:30'),(12,2,'냥이들한테 관심받고 싶은사람 ㄱ','연어 참치,,, 회 먹고 싶다 ',13,'2022-05-17 15:03:51'),(13,2,'님들은 민초단?','동생이 내 네일 보고 민초 같다는데 이거 칭찬?',23,'2022-05-17 15:08:44'),(16,5,'이런 네일 잘하는 네일샵 어디 없을까요??','어우 저 영롱한 빛깔좀 보세요\r\n저런 네일 잘하는 집 추천해주세요!',13,'2022-05-17 16:41:25'),(17,6669,'손톱관리 너무 힘든것 같아요 ㅠㅠ ','손톱이 너무 얇아서  자주 깨지고 큐티클이 제거가 깔끔하게 안돼요 ㅠㅠ\r\n영양제라도 먹어야 할 것 같은데 좋은거 아시는분 추천좀 해주세요~~\r\n광고 사절~',14,'2022-05-17 16:43:07'),(18,5,'호신용 네일 어떤가요??','네일아트에 실용성을 더해서 살상능력을 갖춘 네일아트입니다.\r\n괜찮나요?',13,'2022-05-17 16:54:04'),(19,2,'5월 16일 남자 둘이서','마산 시티베이오신분들!!!\r\n미리네일 사이트 구경하는 거 다 봤어요 ㅎㅎㅎ\r\n이 글도 보고 있으시려나 \r\n그냥 반갑다구^',13,'2022-05-17 16:58:51'),(20,6669,'봄 어디갔어~~~ ㅜㅜ','날씨 갑자기 너무 더워진거 아닌가요.... \r\n\r\n여름 네일 추천좀 해주세요~!!',15,'2022-05-17 17:02:32'),(21,2,'이 손톱으로 코딩 가능할까요?','카우팅 스ㄸrrr\r\n밤하늘에 퍼rr\r\n베러덴 루비똥루비똥~~~\r\n',26,'2022-05-17 17:06:37'),(22,5,'어제 받은 네일이에요!','이쁘죠!!!!!!!',21,'2022-05-17 18:07:47'),(23,6669,'셀프 네일 도전! ','버퍼랑 이것저것 사려고 하는데 그냥 올리브영꺼 사면 되나요?? \r\n써보신분??',15,'2022-05-17 18:08:01'),(25,2,'내 손톱도 네일가능하냥흥22','이쁘게 해주는게 여러명한테 좋을꺼다흥',33,'2022-05-17 18:21:59'),(26,5,'이 사이트 이용자는 세명뿐인가요??','이상하네요!    ',23,'2022-05-17 21:05:11'),(28,1,'곰탱이','곰곰곰곰문문문문',17,'2022-05-18 23:02:06');
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:56:59
