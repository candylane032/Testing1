-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2023 at 09:41 PM
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
(1, 1, 'scaling.png', 'nahalin na', '10:01:pm - 2023/10/05'),
(13, 1, 'carl.jpg', 'Gwapo kaayo hehe', '2:26:am - 2023/11/12'),
(14, 1, 'admin.png', 'Admin Picture haha', '2:38:am - 2023/11/12');

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
(61, 1, 37, 'Wzzap'),
(62, 37, 1, 'Oy');

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
(87, 50, 27, 3, 900, 'gcash', '342123124231', 'paymentgcash.jpg', 'Paid', 'complete', '4:36:am - 2023/11/12');

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
  `stock` varchar(50) NOT NULL DEFAULT 'Available',
  `created` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `user_id`, `pname`, `img`, `p_price`, `stock`, `created`) VALUES
(22, 1, 'DANGGIT', 'Danggit.jpg', '300', 'Not Available', '3:10:am - 2023/11/12'),
(23, 1, 'BANGUS', 'bangus.jpg', '400', 'Not Available', '3:10:am - 2023/11/12'),
(24, 1, 'LAPU-LAPU', 'lapu.jpg', '200', 'Not Available', '3:10:am - 2023/11/12'),
(25, 1, 'TULINGAN', 'tulingan.jpg', '320', 'Available', '3:10:am - 2023/11/12'),
(26, 1, 'TAMBAN', 'stone fish.jpg', '400', 'Available', '3:10:am - 2023/11/12'),
(27, 1, 'TAMARONG', 'tamarong.jpg', '300', 'Available', '3:52:am - 2023/11/12');

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
(107, 32, 'Rowser', 'Amodia', 'male', '09226053498', 'subabasbas lapulapu city', '8:28:pm - 2023/10/09'),
(108, 33, 'Carl', 'Ngojo', 'male', '09123456789', 'Cordova', '8:31:pm - 2023/10/09'),
(109, 34, 'Arjohn', 'Dagalas', 'male', '09513531877', 'LLC, Pajo', '7:50:pm - 2023/10/16'),
(110, 35, 'row', 'row', 'male', '09513531877', 'subabasbas lapulapu city', '8:12:pm - 2023/10/16'),
(111, 36, 'laika', 'patigdas', 'female', '09226053498', 'subabasbas lapulapu city', '8:44:pm - 2023/10/24'),
(112, 37, 'carl', 'ngojo', 'male', '09952855322', 'Ibabao Cordova Cebu', '9:48:pm - 2023/11/11'),
(113, 44, 'carl', 'ngojo', 'male', '09984018923', 'Cordova Cebu', '10:09:pm - 2023/11/1'),
(114, 47, 'carl', 'ngojo', 'male', '09984019023', 'cordova cebu', '10:19:pm - 2023/11/1'),
(115, 48, 'Jovet', 'quillan', 'male', '09984018923', 'Camolinas', '10:38:pm - 2023/11/1'),
(116, 49, 'carl', 'ngojo', 'male', '09984018923', 'ibabao cordova cebu', '10:41:pm - 2023/11/1'),
(117, 50, 'carl', 'ngojo', 'male', '09984018923', 'Ibabao Cordova', '3:53:am - 2023/11/12'),
(118, 51, 'carl', 'ngojo', 'male', '09952855322', 'Ibabao Cordova', '4:01:am - 2023/11/12');

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
(160, 51, 27, 10, 3000, 'cod', 'null', 'null', 'Paid', 'complete', '4:18:am - 2023/11/12'),
(161, 51, 26, 5, 2000, 'cod', 'null', 'null', 'Paid', 'complete', '4:18:am - 2023/11/12');

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
(1, '_MG_8441.JPG', 'admin', 'admin@gmail.com', '21232f297a57a5a743894a0e4a801fc3', 'admin', 'Verified', 'Active now', '6:58:pm - 2023/11/09'),
(37, 'carl.jpg', 'james', 'james@gmail.com', 'df731b3f0f1f45a23e0c07f91c9d2393', 'customer', 'Verified', 'Offline now', '9:48:pm - 2023/11/11'),
(44, 'carl.jpg', 'karlo', 'karlo@gmail.com', 'df731b3f0f1f45a23e0c07f91c9d2393', 'customer', 'Verified', 'Offline now', '10:04:pm - 2023/11/1'),
(50, 'customer.png', 'carl', 'carlngujo032@gmail.com', 'df731b3f0f1f45a23e0c07f91c9d2393', 'customer', 'Verified', 'Active now', '3:53:am - 2023/11/12'),
(51, 'carl.jpg', 'carl1', 'carl1@gmail.com', 'df731b3f0f1f45a23e0c07f91c9d2393', 'customer', 'Verified', 'Offline now', '4:00:am - 2023/11/12');

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
  MODIFY `gallery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `msg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `reserves`
--
ALTER TABLE `reserves`
  MODIFY `reserve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
