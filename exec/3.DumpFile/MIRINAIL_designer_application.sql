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
-- Table structure for table `designer_application`
--

DROP TABLE IF EXISTS `designer_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designer_application` (
  `designer_seq` bigint NOT NULL COMMENT 'AI',
  `designer_certification` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '사업자등록증',
  `designer_shop_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `designer_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `designer_tel` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `designer_auth_status` int NOT NULL DEFAULT '0' COMMENT '0 : 진행중, 1 : 거절',
  `designer_reged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`designer_seq`),
  CONSTRAINT `FK_user_TO_designer_application_1` FOREIGN KEY (`designer_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designer_application`
--

LOCK TABLES `designer_application` WRITE;
/*!40000 ALTER TABLE `designer_application` DISABLE KEYS */;
INSERT INTO `designer_application` VALUES (1,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/1033e21a-0785-409b-8160-312892f7c875.png','어사장','경남 창원시 진해구 석동로 1 (이동)','01000000000',1,'2022-05-12 16:47:31'),(2,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0262e187-ccbc-474e-834c-54ae2272a2ef.jpg','호호네일','부산 남구 고동골로 1 (문현동, 삼삼부동산)','01023452233',1,'2022-05-19 22:09:57'),(3,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','김갑생김할머니','부산 부산진구 새싹로 295','01011111111',1,'2022-05-19 01:21:32'),(5,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/324e2a6e-9e5d-403f-be60-077ce1daa334.png','영남네일','부산 강서구 신호동 231','01093230344',1,'2022-05-12 16:27:36'),(6,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','정환네일','경남 김해시 금관대로1289번길 22','01022222222',1,'2022-05-19 01:22:28'),(7,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','드래곤네일','경남 김해시 장유로316번길 18-62','01065468794',1,'2022-05-19 01:23:19'),(8,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','천년네일','경남 김해시 진영읍 죽곡리','01097971454',1,'2022-05-19 01:23:53'),(9,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','나노네일','경남 창원시 의창구 대산면 가술길 27-9','01099796454',1,'2022-05-19 01:24:43'),(10,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','꾸러기네일','경남 창원시 의창구 대산면 갈전로 109','01097975555',1,'2022-05-19 01:25:21'),(11,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/40e71c7b-d6bc-4c9f-bc31-f1126ef34322.jpg','네일하오','인천 남동구 호구포로 782','01097513574',1,'2022-05-19 01:26:39'),(12,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/1033e21a-0785-409b-8160-312892f7c875.png','에밀네일','서울 용산구 이태원동','01097975552',1,'2022-05-19 01:27:37'),(13,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','Spider Nail','서울 마포구 만리재옛길 64','01099975154',1,'2022-05-19 01:28:23'),(14,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','싸네일','서울 서대문구 연희로 38-14','01097978112',1,'2022-05-19 01:29:07'),(15,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','룡룡네일','서울 마포구 연남로11길 22','01099912332',1,'2022-05-19 01:29:45'),(16,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','General Nail','서울 마포구 성미산로1길 108','01099955555',1,'2022-05-19 01:30:35'),(17,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0df274cb-a5a4-4e03-95d0-1a565b76c23a.jpg','카롱카롱','인천 남동구 호구포로 782','01099211512',1,'2022-05-19 01:31:09'),(18,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','가지 네일','경남 창원시 의창구 대산면 갈전로 109','01099912333',1,'2022-05-19 01:31:44'),(19,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','소녀시대 네일','서울 서대문구 연희로 38-14','01209920014',1,'2022-05-19 01:32:12'),(20,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','현태 네일','경남 창원시 의창구 대산면 갈전로 109','01055513121',1,'2022-05-19 01:39:03'),(21,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','오마이 네일','경남 김해시 금관대로1289번길 22','01044451513',1,'2022-05-19 01:39:03'),(22,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0df274cb-a5a4-4e03-95d0-1a565b76c23a.jpg','광야 네일','서울 용산구 이태원동','01066598775',1,'2022-05-19 01:39:03'),(23,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','위너 네일','경남 창원시 의창구 대산면 가술길 27-9','01099798551',1,'2022-05-19 01:39:03'),(24,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/1033e21a-0785-409b-8160-312892f7c875.png','유명 네일','경남 창원시 의창구 대산면 갈전로 109','01033265412',1,'2022-05-19 01:39:03'),(25,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','빚더미 네일','서울 서대문구 연희로 38-14','01099213154',1,'2022-05-19 01:39:03'),(26,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','아이브 네일','부산 남구 수영로 324 (대연동, 리마크빌 대연)','01098975154',1,'2022-05-19 01:39:03'),(6667,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0df274cb-a5a4-4e03-95d0-1a565b76c23a.jpg','디자이너곽','경기 성남시 분당구 판교역로 4 (백현동)','01088137380',1,'2022-05-12 16:46:37'),(6668,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/ecb5d8cf-3d34-46e9-a8fc-a10bc3ab792f.JPG','최호준','부산 남구 수영로 324 (대연동, 리마크빌 대연)','01083660400',1,'2022-05-12 16:43:00'),(6669,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','Nail For U','경남 진주시 진주대로500번길 5 (가좌동)','01023234939',1,'2022-05-12 17:32:29');
/*!40000 ALTER TABLE `designer_application` ENABLE KEYS */;
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
