-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table nexus_arena_db.tournaments
CREATE TABLE IF NOT EXISTS `tournaments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `category` varchar(50) NOT NULL,
  `event_date` varchar(100) NOT NULL,
  `location` varchar(150) NOT NULL,
  `prize` varchar(100) NOT NULL,
  `contact_name` varchar(100) NOT NULL,
  `contact_role` varchar(120) NOT NULL,
  `contact_phone` varchar(50) NOT NULL,
  `summary` text NOT NULL,
  `content` text NOT NULL,
  `photo` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table nexus_arena_db.tournaments: ~3 rows (approximately)
INSERT INTO `tournaments` (`id`, `title`, `category`, `event_date`, `location`, `prize`, `contact_name`, `contact_role`, `contact_phone`, `summary`, `content`, `photo`) VALUES
	(1, 'Nexus Championship Season 4 - Mobile Legends', 'Turnamen', '15 Desember 2026', 'Online & Grand Final Bandung', 'Rp 15.000.000', 'Ahmad Rizcky Helmi', 'Tournament Organizer & Admin Pendaftaran', '0812-3456-7890', 'Pendaftaran resmi dibuka untuk 64 tim terbaik memperebutkan total hadiah 15 juta rupiah.', 'Nexus Arena resmi membuka pendaftaran Nexus Championship Season 4. Babak kualifikasi akan digelar secara online dengan sistem Single Elimination BO3, dan 4 tim terbaik akan bertanding secara offline pada babak Grand Final.', 'photo/poster-mlbb.jpg'),
	(2, 'Jadwal Technical Meeting & Pembagian Bracket Valorant', 'Jadwal', '10 Desember 2026', 'Discord Official Nexus Arena', 'Rp 10.000.000', 'Nadia Putri', 'Koordinator Pertandingan & Bracket', '0857-9876-5432', 'Wajib dihadiri oleh seluruh kapten tim peserta Valorant Campus Cup sebelum pertandingan dimulai.', 'Technical Meeting akan membahas regulasi map pool, aturan stand-in pemain, jadwal pertandingan fase grup, serta pengundian bracket resmi.', 'photo/poster-valorant.jpg'),
	(3, 'Open Recruitment Caster & Panitia Event 2027', 'Pengumuman', '20 Desember 2026', 'Kantor Pusat Nexus Arena / Hybrid', 'Kontrak & Fee Event', 'Dimas Saputra', 'HR & Production Lead', '0821-1122-3344', 'Bergabunglah bersama tim produksi dan shoutcaster resmi untuk rangkaian turnamen tahun 2027.', 'Perusahaan membuka kesempatan bagi talenta muda di bidang shoutcasting, observer in-game, dan manajemen turnamen.', 'photo/poster-oprec.jpg');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
