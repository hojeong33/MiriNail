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
-- Table structure for table `nailart`
--

DROP TABLE IF EXISTS `nailart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nailart` (
  `nailart_seq` bigint NOT NULL AUTO_INCREMENT,
  `designer_seq` bigint NOT NULL,
  `token_id` bigint DEFAULT NULL,
  `nailart_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `nailart_desc` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `nailart_type` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `nailart_color` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nailart_detail_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nailart_weather` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nailart_thumbnail_url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `nailart_available` bit(1) DEFAULT b'1',
  `nailart_price` int DEFAULT NULL,
  `nailart_reged_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nailart_rating` float NOT NULL DEFAULT '0' COMMENT '1~5점 사이',
  `nailart_nft` varchar(200) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`nailart_seq`),
  KEY `FK_designer_info_TO_nailart_1` (`designer_seq`),
  CONSTRAINT `FK_designer_info_TO_nailart_1` FOREIGN KEY (`designer_seq`) REFERENCES `designer_info` (`designer_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nailart`
--

LOCK TABLES `nailart` WRITE;
/*!40000 ALTER TABLE `nailart` DISABLE KEYS */;
INSERT INTO `nailart` VALUES (1,6667,0,NULL,'연보라 색의 산뜻한 느낌을 주는 네일입니다.^^\n제가 가장 좋아하는 색깔이기도 하고 대부분의 사람들이 어울릴만한 디자인이에요.\n색깔이 튀지도 않아 질리지도 않고 오래동안 유지할 수 있습니다!','젤','purple','라이트 퍼플','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/7ea27df4-ac4c-4b4a-8309-6baf8556aab0.jpg',_binary '\0',45000,'2022-05-19 10:23:49',0,'QmYmWZz5dzKMozKx51xTsDxBohVsK7D6uEoHXCaXFVb7Wb'),(2,6667,0,NULL,'너무 밝은 색이 부담스러운데 또 어두운 계열은 잘 받지 않으신 분들!\n올 가을에 가장 어울리는 갈색 네일은 어떠신가요?\n자칫 답답 해보일 수 있는 갈색이지만 실제로 보신다면 깜짝 놀라실거에요!!','프렌치','brown','바비 브라운','가을','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/6953234f-e837-424b-89dc-e2cbd3d34e99.jpg',_binary '\0',50000,'2022-05-19 10:27:59',0,'QmaUg2Y23kf6x4mrLNR75YERf8jBNEptNBHj5RXkKnkNKQ'),(3,6667,0,NULL,'하늘하늘한 여름처럼 산뜻한 색을 찾으신다구요?\n올 여름을 강타할 최고의 디자인을 소개시켜드립니다.\n더 자세한 상황은 샵에 방문해주세요~','젤','skyblue','스카이','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/92e22133-c082-44bd-966d-8060d17dc3e3.jpg',_binary '\0',25000,'2022-05-19 10:30:21',4,'QmT4KgXEmGc2QcjYka6wi4PpSsjstCrvM8n7RJ2Q8t4Jqi'),(4,1,0,NULL,'여름엔 시퍼런 블루가 짱이죠','젤','skyblue','시퍼런 블루','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/7f89919a-0069-4a5f-92e6-73e1fe9b370f.jpg',_binary '\0',85000,'2022-05-19 10:33:57',5,'QmRvGGjVcyzEwcSAprAffdiLFCWFFWh76fpfB8RvMVVRRU'),(5,1,0,NULL,'흐릿흐릿한 날씨엔 흐릿한 그레이','라인스톤','silver','흐릿한 그레이','가을','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/1428f94e-8cd7-4c16-9977-a0e8f19d1f77.jpg',_binary '\0',55000,'2022-05-19 10:36:00',5,'QmYttNbSetKw6r1f6GyMH6HEjz3cubS3gCUyEmHxi1RNxx'),(6,6669,0,NULL,'Nail For U의 많은 손님들이 찾고 사랑해주신 Dried Rose 컬러입니다. \n호불호가 없고 어떤 코디에도 잘 녹아드는 컬러로 부담없이 시도해보세요 :)','젤','pink','Dried Rose','봄','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/9e3c99ec-db57-4c8d-b95d-93d5bc2dc4cb.jpg',_binary '\0',50000,'2022-05-19 10:40:53',5,'QmX1Gc2WaXkQdAyLes4TwJie45UBaRTc97FVq9r3xHPE95'),(7,1,0,NULL,'내 손 안에 우주를 담고 싶으시다면!\n추천드립니다!','젤','blue','blue','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/39172861-9296-4565-87b7-1440ec6d1628.jpg',_binary '\0',55000,'2022-05-19 10:42:35',0,'QmfZ5XMHibU3A4cp1wJ9krWeBCpQQeptzY9nG4Ebk2neFj'),(8,6669,0,NULL,'지중해 해변에서 어울릴 블루컬러와 조개빛의 아름다운 화이트 베이지 컬러를 매칭 시켰습니다.\n올 여름에는 이번 Deep sea Blue컬러 어떠신가요?','젤','skyblue','Deep Sea Blue','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/6b61ba41-5247-4d9d-b0eb-de4085107312.jpg',_binary '\0',79000,'2022-05-19 10:54:35',0,'Qmcj3LqvH7WknHnwyDV7yhHfPaLpDtATAsdqThfSdKeSqK'),(9,6667,0,NULL,'화려하고 도도한 네일!\n드레스와 찰떡궁합을 이루는 디자인 입니다!\n실제로 보면 더 화려하실거에요^^ 직접 방문해서 실착해보셔요.','프렌치','pink','블링블링','봄','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/1ef62538-2a9f-40f0-bcc6-746b69b0a632.jpg',_binary '\0',120000,'2022-05-19 10:58:59',0,'QmRvQUaNrrZaKkDgs97ECjZGGgAqE7EcdXuWtdXS3xyF4v'),(10,6667,0,NULL,'귀엽죠?\n사랑스럽죠?\n하고싶죠?','프렌치','red','수박수박','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/428f0d9a-3331-49e4-91ff-f4957cd2be7c.jpg',_binary '\0',40000,'2022-05-19 11:04:21',4,'QmQGrwYKazErPeCqfk2D2vtLH6r1Ym9ky7cVfzLVNEsVXj'),(11,6667,0,NULL,'귀여운 유령들이 내손에??\n코스프레같은 느낌을 좋아하신다면 한 번쯤!','라인스톤','navy','고스트','겨울','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/8e6273a8-f5ee-47c4-bc1f-40951f7f4111.jpg',_binary '\0',30000,'2022-05-19 11:05:49',0,'QmeY94Nyo16DTwES2ms3swpCGb1Dn2Yje6hivSeHyqYKPX'),(12,6667,0,NULL,'투명색 베이스 노란색의 톡톡튀는 네일!\n오늘 인싸는 누구?','라인스톤','yellow','톡톡 옐로','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/3d9708e9-0fc3-44ce-bee6-979f2910d22f.jpg',_binary '\0',45000,'2022-05-19 11:09:57',5,'QmSsoyR834zzzbdGzDzMyCJmbkssNpym7RLJ6aEXZ1Ljrt'),(13,6669,0,NULL,'타고 남은 나뭇잎향을 연상 시키는 색으로 고급스러운 스타일의 컬러입니다.','젤','brown','Dark Brown','가을','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/273cffc0-961f-45fe-b3a1-2f14a79b3f53.jpg',_binary '\0',80000,'2022-05-19 11:10:44',4,'QmTLgDcMSQ3TCKddAzTUiTASUp6vB5wio7waSiY14AP3Hm'),(14,6667,0,NULL,'뭐죠? 화려한듯 단아한듯 이쁜 요놈의 정체는?\n궁금하신 분들은 언제든지 샵에 방문해주세요~','프렌치','orange','프란체스카','봄','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/9455bb17-7ccf-46ae-9919-a678f402a57c.jpg',_binary '\0',35000,'2022-05-19 11:11:00',0,'QmNuSTwRzmfLSVZL89hBKw637yTo4CUZyaNzfknNhCRcmg'),(15,5,0,NULL,'대리석을 모티브로 한 트렌디한 네일입니다~','젤','silver','대리석 실버','겨울','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/32c6c6c0-73f5-4f4d-b583-f824bcffd475.png',_binary '\0',60000,'2022-05-19 13:27:29',3.5,'QmPhBUEQGWgL4gayFzjUYtChMWDZdJFpyEr2JpTkyXABJa'),(16,6667,0,NULL,'여름철 시원한 색감을 주는 네일!\n남자들도 할 수 있을만한 네일입니다~','프렌치','blue','아쿠아 블루','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/d1853a07-9308-430c-b145-28285d8ac235.jpg',_binary '\0',45000,'2022-05-19 14:09:34',0,'QmPhudLzRYpBjTQY5mFevPEnXaJkXptduzHY74KZoDmbTq'),(17,1,0,'일단은 더미','여름에는 네일도 시원하게 파란색으로 준비했습니다!!!','프렌치','blue','파랑','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/f4d3bb55-592c-417a-815a-58d23968944f.jpg',_binary '',55000,'2022-05-19 14:51:48',0,'QmSwN2SaSDsu1SShmaS3ozRvxCEvdtAoMbNuwfZtrBxZRK'),(18,1,0,NULL,'여름에는 시퍼런 블루','젤','blue','블루','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0e632762-a8e9-49a8-ba28-53b67cc63b9b.jpg',_binary '\0',55000,'2022-05-19 15:16:57',0,'QmcBeNomnhpepUXx8GooytuJxnMBUj7dY7b46p81pNtuVG'),(19,6668,0,NULL,'신규 네일 블루 입니다. 많이 찾아주세요','젤','blue','라이트 블루','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/d9fde9ff-c5c2-4641-93a0-ef98a52ccee1.png',_binary '\0',30000,'2022-05-19 16:55:32',5,'QmQw9LTqP1vDUdK9n1V4Jxqc3TjJajBQEoFM3yVpg1HVmj'),(20,6668,0,NULL,'신규 네일 블루 입니다. 많이 찾아주세요','젤','blue','라이트 블루','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/48b2e69c-6bf9-4632-b7d0-dad50aa5c335.png',_binary '\0',30000,'2022-05-19 16:56:42',0,NULL),(21,2,0,NULL,'귀여운 세잎클로버와 반짝이는 골드의 만남 ! 지금 바로 도전하세요~','젤','green','그린','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/da5a3d81-6c78-450d-ac34-10bb8bc0178c.jpg',_binary '\0',60000,'2022-05-19 22:57:18',4,'QmbfNpqST6zskTHEuQm9L2As5dD6n2Thbg1K7XnSq95Jew'),(22,1,0,NULL,'여름에는 시원하게 시퍼런 블루 어떠신가요?\n가상피팅 해보시고 마음에 드시면 바로 예약 해주세요!!!\n','젤','navy','qmffn','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/8d9baa99-2ba2-4686-87e2-99ebac834324.jpg',_binary '',5550,'2022-05-20 00:26:00',0,'QmTwaK7zdR5GDD3YEseGa4JbYihJFZhqpP5e3suq36jK9T'),(23,1,0,'일단은 더미','여름에는 시원하게 시퍼런 블루 어떠신가요?\n가상피팅 해보시고 마음에 드시면 바로 예약 해주세요!!!\n','젤','navy','qmffn','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/cf47b4c9-cf8c-4970-b367-ecf404b577e3.jpg',_binary '',55555,'2022-05-20 00:41:43',0,'QmPak1eym86oNR3UMTVwtRrJeKx9Ejaovk1kLBF31b5ya7'),(24,2,0,NULL,'시원한 민트색으로 여름느낌 제대로 느끼세요~','프렌치','skyblue','민트','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/087bfa3d-a01a-4596-bd8a-b48e67577e89.jpg',_binary '',50000,'2022-05-20 00:41:02',0,'QmR2PLg4HTseLhScvM3p2KADmcrHNgNPhEEXJ1mhsWnA3s'),(25,2,0,NULL,'시원한 민트색으로 여름 느낌 제대로 느끼세요~','프렌치','skyblue','민트','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/1dada7ae-ee78-4db9-ba66-5ee9975ba550.jpg',_binary '',50000,'2022-05-20 00:42:37',0,'Qmbg8Yc6cu7UcB8CiHir9NsiJzDM1zEeTCBg7eb9HQdtPu'),(26,2,0,NULL,'시원한 민트색으로 여름 느낌 제대로@!!!','프렌치','skyblue','민트','여름','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/81c0b9d3-c22f-430c-981c-1bc419d26125.jpg',_binary '\0',50000,'2022-05-20 00:44:10',0,'QmYEPrwWWSjXmbfWVjDCxgSkotJCu5ip6BXGt5dz8fP4BH');
/*!40000 ALTER TABLE `nailart` ENABLE KEYS */;
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
