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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_tel` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '+82 00-0000-0000',
  `user_role` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `user_gender` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '0 : 남자, 1 : 여자',
  `user_age_range` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '20~29: 20세 이상 30세 미만',
  `user_profile_Img` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `user_reged_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=6692 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2210477511','jya3385@daum.net','서빈 Seobeen',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg','2022-04-22 14:04:46'),(2,'2210624673','jhj20071@naver.com','전호정',NULL,'ROLE_ARTIST','female','20~29','http://k.kakaocdn.net/dn/cXeRLQ/btrvCms6tL8/vEPiBHIbePu9Z3mSlPC6ck/img_640x640.jpg','2022-04-22 14:09:44'),(3,'test','matt@naver.com','김갑생',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg',NULL),(5,'2217289220','ggpp0909@naver.com','장영남',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg','2022-04-26 10:37:03'),(6,'test1','test2@naver.com','안정환',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg',NULL),(7,'test2','test3@naver.com','이을용',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(8,'test3','test4@naver.com','이천수',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(9,'test4','test5@naver.com','박은빈',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(10,'test5','test6@naver.com','비',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/cXeRLQ/btrvCms6tL8/vEPiBHIbePu9Z3mSlPC6ck/img_640x640.jpg',NULL),(11,'test6','test7@naver.com','륭 사오핑',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(12,'test7','test8@naver.com','Emily Johnson',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(13,'test8','test9@naver.com','Peter Parker',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg',NULL),(14,'test9','test10@naver.com','박종철',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(15,'test10','test11@naver.com','김동룡',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(16,'test11','test12@naver.com','네일대장',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(17,'test12','test13@naver.com','마카롱',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(18,'test13','test14@naver.com','오이무침',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(19,'test14','test15@naver.com','서현',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(20,'test15','test16@naver.com','태현',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(21,'test16','test17@naver.com','유아',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(22,'test17','test18@naver.com','카리나',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(23,'test18','test19@naver.com','송민호',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/cXeRLQ/btrvCms6tL8/vEPiBHIbePu9Z3mSlPC6ck/img_640x640.jpg',NULL),(24,'test19','test20@naver.com','딘딘',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg',NULL),(25,'test20','test21@naver.com','임채무',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/cXeRLQ/btrvCms6tL8/vEPiBHIbePu9Z3mSlPC6ck/img_640x640.jpg',NULL),(26,'sdfsad','fasd@gdfsg.com','레이','0491282322','ROLE_ARTIST','femail',NULL,'https://images.chosun.com/resizer/JASmJI35grsMW2K-YTJ5O2izuyI=/530x662/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/THYRMOWNZGTORR7LVW7VH2JRZ4.jpg',NULL),(6667,'2216900594','kb207906@hanmail.net','곽동현',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','2022-05-12 15:27:00'),(6668,'2239301275','matt7576@naver.com','최호준',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/LLt7F/btrzHOjWR6e/WfhqtHVjOnl1x6me6dlGtK/img_640x640.jpg','2022-05-12 16:39:37'),(6669,'2220562810','cys3362@naver.com','이삭',NULL,'ROLE_ARTIST','male','20~29','http://k.kakaocdn.net/dn/1RZ2f/btrvPe81Bbz/ryzO2kEe97qQBhW6KF2101/img_640x640.jpg','2022-05-12 16:41:40'),(6670,'2244017723','rmlgml@naver.com','이다은',NULL,'ROLE_USER','female','20~29','http://k.kakaocdn.net/dn/bhiW7N/btrlTjx59NK/J4cnqMs89kgGWIyc0q0KEK/img_640x640.jpg','2022-05-16 09:16:26'),(6671,'2244057613','bhj6963@naver.com','정우영',NULL,'ROLE_USER','male','20~29','http://k.kakaocdn.net/dn/beVZSN/btrro5asuOy/qQgNno8uIdiiID49PQqskK/img_640x640.jpg','2022-05-16 09:56:01'),(6672,'dummy1','dummy1@naver.com','이병헌',NULL,'ROLE_USER','male','20~29','https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202204/29/c7408d77-53f8-4685-bafc-a155d53cad1a.jpg',NULL),(6673,'dummy2','dummy2@naver.com','신민아',NULL,'ROLE_USER','female','20~29','https://file2.nocutnews.co.kr/newsroom/image/2020/09/24/20200924213008312940_0_710_654.jpg',NULL),(6674,'dummy3','dummy3@naver.com','이정재',NULL,'ROLE_USER','male','20~29','https://dimg.donga.com/wps/NEWS/IMAGE/2020/07/26/102163403.4.jpg',NULL),(6675,'dummy4','dummy4@naver.com','원빈',NULL,'ROLE_USER','male','20~29','https://www.ktnews.com/news/photo/201910/112662_66303_2939.jpg',NULL),(6676,'dummy5','dummy5@naver.com','이나영',NULL,'ROLE_USER','female','20~29','http://img.etoday.co.kr/pto_db/2018/11/700/20181127142753_1275480_600_912.jpg',NULL),(6677,'dummy6','dummy6@naver.com','이광수',NULL,'ROLE_USER','male','20~29','http://img.etoday.co.kr/pto_db/2018/11/700/20181127142753_1275480_600_912.jpg',NULL),(6678,'dummy7','dummy7@naver.com','전소민',NULL,'ROLE_USER','female','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(6679,'dummy8','dummy8@naver.com','유재석',NULL,'ROLE_USER','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(6680,'dummy9','dummy9@naver.com','하동훈',NULL,'ROLE_USER','male','20~29','https://www.ktnews.com/news/photo/201910/112662_66303_2939.jpg',NULL),(6681,'dummy10','dummy10@naver.com','박명수',NULL,'ROLE_USER','male','20~29','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',NULL),(6682,'dummy11','dummy11@naver.com','노홍철',NULL,'ROLE_USER','male','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg',NULL),(6683,'dummy12','dummy12@naver.com','길',NULL,'ROLE_USER','male','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg',NULL),(6684,'dummy13','dummy13@naver.com','정준하',NULL,'ROLE_USER','male','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg',NULL),(6685,'dummy14','dummy14@naver.com','전진',NULL,'ROLE_USER','male','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(6686,'dummy15','dummy15@naver.com','비와이',NULL,'ROLE_USER','male','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg',NULL),(6687,'dummy16','dummy16@naver.com','행주',NULL,'ROLE_USER','male','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg',NULL),(6688,'dummy17','dummy17@naver.com','던밀스',NULL,'ROLE_USER','male','20~29','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',NULL),(6689,'dummy18','dummy18@naver.com','이미주',NULL,'ROLE_USER','female','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg',NULL),(6690,'dummy19','dummy19@naver.com','오나라',NULL,'ROLE_USER','female','20~29','http://k.kakaocdn.net/dn/HGEsm/btry2mVSHVi/KiLpGS27LolMJ3IWVu70BK/img_640x640.jpg',NULL),(6691,'dummy20','dummy20@naver.com','노제',NULL,'ROLE_USER','female','20~29','http://k.kakaocdn.net/dn/clJmzy/btrozxmm2C4/qG3EQViHt65GnabPrKJao0/img_640x640.jpg',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  9:56:55
