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
-- Table structure for table `designer_info`
--

DROP TABLE IF EXISTS `designer_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designer_info` (
  `designer_seq` bigint NOT NULL COMMENT 'AI',
  `designer_certification_url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `designer_shop_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `designer_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `designer_reged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `designer_info_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `designer_info_img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `designer_shop_close` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `designer_shop_open` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `designer_profile_img_url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `designer_tel` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `designer_portfolio_url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`designer_seq`),
  CONSTRAINT `FK_user_TO_designer_info_1` FOREIGN KEY (`designer_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designer_info`
--

LOCK TABLES `designer_info` WRITE;
/*!40000 ALTER TABLE `designer_info` DISABLE KEYS */;
INSERT INTO `designer_info` VALUES (1,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/1033e21a-0785-409b-8160-312892f7c875.png','어사장','경남 창원시 진해구 석동로 1 (이동)','2022-05-19 00:18:19','최고의 만족도를 자랑하는 어사장입니다.','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/2b650c34-b2d7-4211-ab23-8b9facb49532.png','20:00','11:00','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/46f5a588-982d-43e1-9708-5e78b4c54263.gif','01000000000',NULL),(2,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0262e187-ccbc-474e-834c-54ae2272a2ef.jpg','호호네일','부산 남구 고동골로 1 (문현동, 삼삼부동산)','2022-05-19 22:21:14',NULL,NULL,NULL,NULL,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/bdc80a18-4b57-426e-9e06-f701a685b897.jpg','01023452233',NULL),(3,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','김갑생김할머니','부산 부산진구 새싹로 295','2022-05-19 21:11:33',NULL,NULL,NULL,NULL,NULL,'01011111111',NULL),(5,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/324e2a6e-9e5d-403f-be60-077ce1daa334.png','영남네일','부산 강서구 신호동 231','2022-05-19 21:11:33',NULL,NULL,NULL,NULL,NULL,'01093230344',NULL),(6,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','정환네일','경남 김해시 금관대로1289번길 22','2022-05-19 21:11:34',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHGP4XfzrfHYVaqMbolj6vJLrQEywhHVNaOA&usqp=CAU','01022222222',NULL),(7,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','드래곤네일','경남 김해시 장유로316번길 18-62','2022-05-19 21:11:34',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROuzUfkxXQLbQZgv6ftzHfehJMJiOwfuQVgg&usqp=CAU','01065468794',NULL),(8,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','천년네일','경남 김해시 진영읍 죽곡리','2022-05-19 21:11:34',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfEOfS9s2siYbGTj6LpzZ1_p2T4m32aNIgGQ&usqp=CAU','01097971454',NULL),(9,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','나노네일','경남 창원시 의창구 대산면 가술길 27-9','2022-05-19 21:11:34',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6iiw8uQJuKod5AtNdmm1xDkNjOWBbcl8F9w&usqp=CAU','01099796454',NULL),(10,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','꾸러기네일','경남 창원시 의창구 대산면 갈전로 109','2022-05-19 21:11:34',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTokXzCuz7nBjETB29jFKz9x01HrowWFTZrdg&usqp=CAU','01097975555',NULL),(11,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/40e71c7b-d6bc-4c9f-bc31-f1126ef34322.jpg','네일하오','인천 남동구 호구포로 782','2022-05-19 21:11:34',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3o6DXaW2C3s4RI1FuAGFPJXQoHtZqCcwpqQ&usqp=CAU','01097513574',NULL),(12,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/1033e21a-0785-409b-8160-312892f7c875.png','에밀네일','서울 용산구 이태원동','2022-05-19 21:11:34',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Gd3g63PyDtsSK4smxs_pKr06VLSd3N5PsQ&usqp=CAU','01097975552',NULL),(13,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','Spider Nail','서울 마포구 만리재옛길 64','2022-05-19 21:11:35',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSexDwv0wjOhD2AjT46c2OzHQrqRUFdq6o8YhJQwSyRkGKSXs-e7Q9XdI4h1Yx2b_BRwIw&usqp=CAU','01099975154',NULL),(14,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','싸네일','서울 서대문구 연희로 38-14','2022-05-19 21:11:35',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGk-tlMcNMwLVWHuKaF-_1DvW9XdCFMi2iNA&usqp=CAU','01097978112',NULL),(15,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','룡룡네일','서울 마포구 연남로11길 22','2022-05-19 21:11:35',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPiFJoj9FSfc122il6BhqCRVhLQ_q9tyuJBA&usqp=CAU','01099912332',NULL),(16,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','General Nail','서울 마포구 성미산로1길 108','2022-05-19 21:11:35',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpMTNZdjLl5xyOzBOTulJ1m478YH4WihyLQw&usqp=CAU','01099955555',NULL),(17,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0df274cb-a5a4-4e03-95d0-1a565b76c23a.jpg','카롱카롱','인천 남동구 호구포로 782','2022-05-19 21:11:35',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIM6ppHvspm23E6iUcrW8VQKWbT1avoCvelA&usqp=CAU','01099211512',NULL),(18,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','가지 네일','경남 창원시 의창구 대산면 갈전로 109','2022-05-19 21:11:35',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJRVbAMAqhEV3NiHMsIeKMSSlVvOi3IuKmA&usqp=CAU','01099912333',NULL),(19,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','소녀시대 네일','서울 서대문구 연희로 38-14','2022-05-19 21:11:35',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1GeCb6VyLhn-OkGl8sCJib3s5hELwcEIa1g&usqp=CAU','01209920014',NULL),(20,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','현태 네일','경남 창원시 의창구 대산면 갈전로 109','2022-05-19 21:11:36',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_fAUouijAS9Muz_hwF9YQdHoqco-c3L0rg&usqp=CAU','01055513121',NULL),(21,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','오마이 네일','경남 김해시 금관대로1289번길 22','2022-05-19 21:11:36',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn40v5UIzXFLIPgRo_sJR4c_6dZwantpMY7w&usqp=CAU','01044451513',NULL),(22,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0df274cb-a5a4-4e03-95d0-1a565b76c23a.jpg','광야 네일','서울 용산구 이태원동','2022-05-19 21:11:36',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV8z00Xh8eiQAbUEO8S7AnwXf7i5L3YBS2DA&usqp=CAU','01066598775',NULL),(23,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','위너 네일','경남 창원시 의창구 대산면 가술길 27-9','2022-05-19 21:11:36',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQixCT-1JYR6gZDi07OjTHJ7eilr7rLEGPfVQ&usqp=CAU','01099798551',NULL),(24,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/1033e21a-0785-409b-8160-312892f7c875.png','유명 네일','경남 창원시 의창구 대산면 갈전로 109','2022-05-19 21:11:36',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtHyRSWeKpkZTqApyCKAoHbeGXcIliB-i9uQ&usqp=CAU','01033265412',NULL),(25,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','빚더미 네일','서울 서대문구 연희로 38-14','2022-05-19 21:11:36',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Ub9zmnDJ1U6IgKrWGrT-JPg4XHi8ezVizA&usqp=CAU','01099213154',NULL),(26,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','아이브 네일','부산 남구 수영로 324 (대연동, 리마크빌 대연)','2022-05-19 21:11:36',NULL,NULL,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYV3uUaRw93uzaablU4Sm0uaPuPPgZfmKtA&usqp=CAU','01098975154',NULL),(6667,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/0df274cb-a5a4-4e03-95d0-1a565b76c23a.jpg','미리 네일','경기 성남시 분당구 판교역로 4 (백현동)','2022-05-12 16:48:57','수 많은 후기가 증명해주는 젤 네일 장인샵입니다.','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/8e1a875c-9718-417b-b4c7-381ce357ea98.jpg',NULL,NULL,NULL,'01088137380',NULL),(6668,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/ecb5d8cf-3d34-46e9-a8fc-a10bc3ab792f.JPG','쥬니 네일','부산 남구 수영로 324 (대연동, 리마크빌 대연)','2022-05-12 18:52:41','지금까지 이런 트렌드는 없었다! 이것은 네일인가 아트인가, 당신만의 특별한 네일을 위한 쥬니 네일입니다.',NULL,NULL,NULL,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/8e885eb6-8817-4dbb-ae63-6e29ac52d67b.gif','01083660400',NULL),(6669,'https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/5caa640b-b29d-4f47-8f6b-23b31e2f41be.jpg','Nail For U','경남 진주시 진주대로500번길 5 (가좌동)','2022-05-12 17:32:40','> 당신만을 위해 준비한 네일 컬렉션 <\n>      Nail For U 에서 만나보세요     <\n\n\n>> 매주 월요일은 6시까지만 합니다 ;)','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/edd9d2bc-6ebe-4525-a12a-79c299381223.jpg','21:00','10:00','https://mirinail-bucket.s3.ap-northeast-2.amazonaws.com/2fd11342-0c6b-4be2-8ee0-6ab60bd9866c.jpg','01023234939',NULL);
/*!40000 ALTER TABLE `designer_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:56:56
