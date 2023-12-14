-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2023 at 07:27 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `gallery_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `g_image` varchar(100) NOT NULL,
  `descript` varchar(255) NOT NULL,
  `created` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`gallery_id`, `user_id`, `g_image`, `descript`, `created`) VALUES
(1, 1, 'gallery.jpg', 'Fish are fascinating creatures with unique anatomical features that allow them to thrive in their underwater environment. In this article, we\'ll cover the main parts of a fish and their functions. ', '8:13:pm - 2023/11/28'),
(2, 1, 'gallery2.jpg', 'Fish Life Cycle Infographic Diagram. Illustration about lifecycle, development, nebulosus, develop, larvae, biology, juvenile, marine, cycle, adaptation, adult.', '11:02:am - 2023/12/08'),
(3, 1, 'gallery3.jpg', 'Round life cycle salmon composition with circle shaped flowchart and images of fishes of different age vector illustration.', '11:03:am - 2023/12/08'),
(4, 1, 'gallery4.jpg', 'Organisms that die and begin their long sink to the bottom will likely be consumed or snatched up by predators or scavengers before they even hit the floor.', '11:04:am - 2023/12/08');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `msg_id` int(11) NOT NULL,
  `incoming_msg_id` int(50) NOT NULL,
  `outgoing_msg_id` int(50) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`msg_id`, `incoming_msg_id`, `outgoing_msg_id`, `message`) VALUES
(1, 1, 4, 'Hi admin'),
(2, 6, 1, 'Hoy'),
(3, 1, 6, 'Hello');

-- --------------------------------------------------------

--
-- Table structure for table `msg`
--

CREATE TABLE `msg` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `message` text NOT NULL,
  `messageReceived` text NOT NULL,
  `timeMessageArrived` varchar(20) NOT NULL,
  `created` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `msg`
--

INSERT INTO `msg` (`id`, `user_id`, `receiverId`, `message`, `messageReceived`, `timeMessageArrived`, `created`) VALUES
(1, 2, 0, 'Hello Admin, This is User :D', '', '', '12:15:am - 2023/12/11'),
(2, 1, 2, 'Hi User, This is Admin', 'Hello Admin, This is User :D', '12:15:am - 2023/12/1', '12:15:am - 2023/12/11'),
(3, 2, 0, 'Hehehe', '', '', '12:16:am - 2023/12/11'),
(4, 1, 2, 'Hahaha', 'Hello Admin, This is User :D', '12:16:am - 2023/12/1', '12:16:am - 2023/12/11');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_kilo` int(11) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `p_method` varchar(50) NOT NULL,
  `ref_num` varchar(50) NOT NULL DEFAULT 'null',
  `p_method_receipt` varchar(100) NOT NULL DEFAULT 'null',
  `o_payment_status` varchar(50) DEFAULT 'pending',
  `o_delivery` varchar(50) NOT NULL DEFAULT 'waiting',
  `created` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `product_id`, `order_kilo`, `total_amount`, `p_method`, `ref_num`, `p_method_receipt`, `o_payment_status`, `o_delivery`, `created`) VALUES
(1, 2, 19, 5, 1900, 'cod', 'null', 'null', 'Paid', 'complete', '2:12:am - 2023/11/15'),
(2, 4, 17, 5, 1250, 'cod', 'null', 'null', 'Paid', 'complete', '2:13:am - 2023/12/15'),
(3, 6, 19, 3, 1140, 'cod', 'null', 'null', 'Paid', 'complete', '2:15:am - 2023/12/15');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pname` varchar(100) NOT NULL,
  `img` varchar(100) NOT NULL,
  `p_price` varchar(20) NOT NULL,
  `p_desc` text NOT NULL,
  `stock` varchar(50) NOT NULL DEFAULT 'Available',
  `created` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `user_id`, `pname`, `img`, `p_price`, `p_desc`, `stock`, `created`) VALUES
(1, 1, 'BANGUS', 'bangus.jpg', '240', 'Milkfish, known for its silver color and forked tail, is a popular fish in aquaculture. It\'s valued for its mild flavor and is a staple in many Asian cuisines.', 'Not Available', '2:22:am - 2023/12/15'),
(2, 1, 'BODBORON', 'bodboron.jpg', '280', 'Mackerel scad, a schooling fish with a streamlined body, is widely distributed in warm oceanic waters. Its firm, flavorful flesh makes it a popular choice for grilling and frying.', 'Available', '4:42:pm - 2023/12/14'),
(3, 1, 'KATAMBAK', 'katambak.jpg', '350', 'Emperor fish, with their striking colors and majestic appearance, are a group of reef-associated species. Their presence enhances the beauty of coral reefs, and some species are valued in the culinary world for their taste and texture.', 'Available', '4:41:pm - 2023/12/14'),
(4, 1, 'DANGGIT', 'Danggit.jpg', '240', 'Rabbitfish, recognized by their unique head shape and peaceful temperament, are herbivorous marine fish. They play a crucial role in coral reef ecosystems and are sought after for their adaptability in home aquariums.', 'Available', '4:41:pm - 2023/12/14'),
(5, 1, 'TULINGAN', 'tulingan.jpg', '280', 'Bullet tuna, a smaller tuna species, is known for its torpedo-like shape and rich, flavorful meat. Commonly used in sushi and sashimi, it\'s a favorite among seafood connoisseurs.', 'Available', '4:41:pm - 2023/12/14'),
(6, 1, 'RED SNAPPER', 'red snapper.jpg', '420', 'Red snapper, prized for its sweet and nutty flavor, is a popular game fish in both recreational and commercial fishing. Its distinctive red color and delicious taste make it a favorite in various culinary dishes.', 'Available', '4:40:pm - 2023/12/14'),
(7, 1, 'LAGAW', 'lagaw.jpg', '320', 'Threadfin bream, with their colorful scales and distinctive thread-like extensions on their fins, are a visually stunning addition to coral reefs. Their peaceful nature makes them suitable for community aquariums.', 'Available', '4:40:pm - 2023/12/14'),
(8, 1, 'LAPU LAPU', 'lapu-lapu.jpg', '450', 'Groupers are robust and predatory fish found in both shallow and deep waters. Renowned for their size and strength, these fish are popular among anglers and are appreciated for their firm, succulent flesh.', 'Available', '4:40:pm - 2023/12/14'),
(9, 1, 'TANIGUE', 'tanigue.jpg', '500', 'The narrow-barred Spanish mackerel is a predatory fish with distinctive narrow bars along its body. Known for its speed and agility, it\'s a challenging catch for anglers and a delectable choice for seafood aficionados.', 'Available', '4:40:pm - 2023/12/14'),
(10, 1, 'SOLID', 'solid.JPG', '280', 'The Bilason, characterized by its vibrant colors and unique markings, is a tropical fish species that adds a splash of beauty to coral reefs. Its engaging behavior and adaptability make it a prized addition to marine aquariums.', 'Available', '4:39:pm - 2023/12/14'),
(11, 1, 'DUGSO', 'dugso.jpg', '420', ' With a distinctive pointed snout, elongated body, big eyes and thick lips, this wild-caught, marine fish is found mainly inshore around sandy coasts, lagoons and reefs, in tropical waters to around 185m, and caught mainly off northern Australia by lines. With its olive-grey skin, it is the least colorful of the Emperors as well as the most slender.', 'Available', '4:39:pm - 2023/12/14'),
(12, 1, 'TAMARONG', 'tamarong.jpg', '280', 'Bigeye scad, with its streamlined body and large eyes, is a pelagic fish found in open waters. Its firm and flavorful flesh makes it a sought-after catch for seafood lovers and a staple in many cuisines.', 'Available', '4:37:pm - 2023/12/14'),
(13, 1, 'DUHAW', 'duhaw.jpg', '320', 'The yellowtail scad is a schooling fish with a distinct yellow tail. Commonly found in warm coastal waters, this species is appreciated for its delicious taste and is a popular target for both commercial and recreational fishing.', 'Available', '4:37:pm - 2023/12/14'),
(14, 1, 'SASA', 'sasa.jpg', '240', 'Halfbeaks are a diverse group of fish known for their distinctive elongated lower jaws. These fascinating species come in various colors and patterns, making them an intriguing choice for both aquarium enthusiasts and those seeking unique marine life.', 'Available', '4:36:pm - 2023/12/14'),
(16, 1, 'MAMSA', 'mamsa.jpg', '350', 'The horse-eye jack, known for its sleek body and large eye, is a powerful and fast-swimming fish found in tropical waters. With silvery scales and a streamlined shape, it\'s a prized catch for anglers and a striking addition to any aquarium.', 'Available', '4:28:pm - 2023/12/14'),
(17, 1, 'BAYANG', 'bayang.jpg', '250', 'Platax orbicularis, commonly known as the orbicular batfish, is a distinctive-looking fish with a round body and large pectoral fins. Its unique appearance makes it a captivating species for marine aquariums.', 'Available', '7:58:pm - 2023/12/14'),
(18, 1, 'MOL MOL', 'molmol.jpg', '320', 'Parrotfish, known for their beak-like teeth and vibrant colors, are essential for maintaining coral reef health. Their grazing habits and distinctive appearance make them a popular choice for marine enthusiasts.', 'Available', '5:06:pm - 2023/12/14'),
(19, 1, 'TUNA', 'tuna.jpg', '380', 'Yellowfin tuna, characterized by its yellow dorsal and anal fins, is a highly migratory species prized for its flavorful and tender flesh. It\'s a top choice for sashimi and other premium seafood dishes.', 'Available', '7:48:pm - 2023/12/14');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `profile_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `pnumber` varchar(15) NOT NULL,
  `address` varchar(200) NOT NULL,
  `updated` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `fname`, `lname`, `gender`, `pnumber`, `address`, `updated`) VALUES
(1, 3, 'carl', 'ngojo', 'male', '09325260822', 'ibabao cordova cebu', '11:28:am - 2023/12/0'),
(2, 2, 'carl', 'ngojo', 'male', '09325260822', 'Ibaba cordova', '6:18:pm - 2023/12/09'),
(3, 4, 'carl', 'ngojo', 'male', '09325260822', 'ibabao cordova', '4:35:am - 2023/12/14'),
(4, 6, 'rowser', 'amodia', 'male', '09984018923', 'lapu-lapu city', '2:15:am - 2023/12/15');

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `recipe_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `r_name` varchar(100) NOT NULL,
  `r_image` varchar(100) NOT NULL,
  `r_type` varchar(100) NOT NULL,
  `r_list` varchar(255) NOT NULL,
  `created` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`recipe_id`, `user_id`, `r_name`, `r_image`, `r_type`, `r_list`, `created`) VALUES
(1, 1, 'BANGUS', 'paksiw.jpg', 'Paksiw', '1 Eggplant,1 Clove Garlic,1 Ginger, thumb-sized,1 Melon, bitter,1 Onion, small,3 Pcs long green peeper', '8:20:pm - 2023/11/28');

-- --------------------------------------------------------

--
-- Table structure for table `reserves`
--

CREATE TABLE `reserves` (
  `reserve_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `reserve_kilo` int(11) NOT NULL,
  `r_total_amount` int(11) NOT NULL,
  `r_p_method` varchar(50) NOT NULL,
  `r_ref_num` varchar(50) NOT NULL DEFAULT 'null',
  `r_p_method_receipt` varchar(100) NOT NULL DEFAULT 'null',
  `payment_status` varchar(50) NOT NULL DEFAULT 'pending',
  `r_delivery` varchar(50) NOT NULL DEFAULT 'waiting',
  `created` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reserves`
--

INSERT INTO `reserves` (`reserve_id`, `user_id`, `product_id`, `reserve_kilo`, `r_total_amount`, `r_p_method`, `r_ref_num`, `r_p_method_receipt`, `payment_status`, `r_delivery`, `created`) VALUES
(1, 2, 18, 5, 1600, 'cod', 'null', 'null', 'paid', 'complete', '2:12:am - 2023/10/15'),
(2, 4, 16, 5, 1750, 'cod', 'null', 'null', 'paid', 'complete', '2:13:am - 2023/12/15'),
(3, 6, 18, 2, 640, 'cod', 'null', 'null', 'paid', 'complete', '2:16:am - 2023/12/15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `p_image` varchar(100) NOT NULL DEFAULT 'customer.png',
  `username` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'customer',
  `classification` varchar(100) NOT NULL DEFAULT 'Non Verified',
  `status` varchar(100) NOT NULL DEFAULT 'Offline now',
  `created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `p_image`, `username`, `email`, `password`, `role`, `classification`, `status`, `created`) VALUES
(1, 'logo.png', 'admin', 'admin@gmail.com', 'df731b3f0f1f45a23e0c07f91c9d2393', 'admin', 'Verified', 'Active now', '10:17:pm - 2023/10/1'),
(2, '1624865450473 (1).jpg', 'carl', 'carlngujo032@gmail.com', '4635c272b46ca6d613748029bdfaab4e', 'customer', 'Verified', 'Offline now', '9:32:pm - 2023/10/14'),
(4, 'customer.png', 'karlo', 'karlo@gmail.com', 'df731b3f0f1f45a23e0c07f91c9d2393', 'customer', 'Verified', 'Offline now', '9:36:pm - 2023/12/13'),
(5, 'customer.png', 'carla', 'carla@gmail.com', '7c66873064aaa1d7ef191eb59fe89e28', 'customer', 'Non Verified', 'Offline now', '10:29:pm - 2023/12/1'),
(6, 'customer.png', 'rowser', 'carl@gmail.com', 'df731b3f0f1f45a23e0c07f91c9d2393', 'customer', 'Verified', 'Offline now', '7:42:pm - 2023/12/14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`gallery_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`msg_id`);

--
-- Indexes for table `msg`
--
ALTER TABLE `msg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profile_id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`);

--
-- Indexes for table `reserves`
--
ALTER TABLE `reserves`
  ADD PRIMARY KEY (`reserve_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `gallery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `msg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `msg`
--
ALTER TABLE `msg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reserves`
--
ALTER TABLE `reserves`
  MODIFY `reserve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
