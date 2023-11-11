-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2023 at 12:49 PM
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
(1, 14, 20, 'awdawd'),
(2, 14, 20, 'awdawd'),
(3, 14, 20, 'awdawd'),
(4, 14, 20, '123'),
(5, 19, 20, 'asdfsdf'),
(6, 19, 20, 'sdfsdf'),
(7, 19, 20, 'sdfsdf'),
(8, 19, 20, 'row'),
(9, 20, 21, 'awdawd'),
(10, 21, 20, 'awdawda'),
(11, 21, 20, 'sdfsdf'),
(12, 19, 20, 'sssadwasssssssssssssssssssssssssssssssssssssssssss'),
(13, 19, 20, 'awdawd'),
(14, 19, 20, 'awd'),
(15, 19, 20, 'wd'),
(16, 19, 20, 'awd'),
(17, 19, 20, 'awd'),
(18, 19, 20, 'awdadadawdad'),
(19, 19, 20, 'adwawd'),
(20, 14, 20, 'hello admin'),
(21, 20, 14, 'awdawd'),
(22, 14, 20, 'bakit admin'),
(23, 14, 20, 'bakit customer'),
(24, 20, 14, 'wala lang po'),
(25, 21, 22, 'awdaw'),
(26, 22, 20, 'aawdawdg'),
(27, 22, 20, 'dfgdgdf'),
(28, 19, 14, 'adawda'),
(29, 21, 14, 'adwadad'),
(30, 22, 20, 'awdawd'),
(31, 20, 22, 'adawda'),
(32, 22, 20, 'hhhhhh'),
(33, 20, 22, 'hvbhvhjvhjhjhvhj'),
(34, 20, 22, 'fghfhgfhgfh'),
(35, 20, 22, 'jhgjhg'),
(36, 22, 20, 'jfgyufyufyu'),
(37, 20, 22, 'jkgjhgui'),
(38, 34, 22, 'awdawdwad'),
(39, 34, 22, 'sdfsdfsdf'),
(40, 34, 22, 'hello arjohn'),
(41, 22, 34, 'awdawd'),
(42, 22, 34, 'awdawdawdawd'),
(43, 22, 34, 'w'),
(44, 22, 34, 'w'),
(45, 22, 34, 'd'),
(46, 22, 34, 'daw'),
(47, 22, 34, 'a'),
(48, 22, 34, 'd'),
(49, 22, 34, 'd'),
(50, 22, 34, 'a'),
(51, 22, 34, 'a'),
(52, 22, 34, 'd'),
(53, 34, 22, 'awdawdaw');

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
(1, 1, 'bangus', 'bangus.jpg', '453453', 'Available', '4:41:pm - 2023/09/28'),
(2, 1, 'tamban', 'tamban.jpg', '23434', 'Available', '4:42:pm - 2023/09/28'),
(3, 1, 'tulingan', 'tulingan.jpg', '4234', 'Not Available', '6:43:pm - 2023/09/28'),
(4, 1, 'danggit', 'Danggit.jpg', '5345', 'Available', '4:44:pm - 2023/09/28'),
(5, 1, 'lapu', 'lapu.jpg', '2554', 'Available', '4:50:pm - 2023/09/28'),
(6, 1, 'stone fish', 'stone fish.jpg', '223', 'Available', '4:54:pm - 2023/09/28');

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
(10, 20, ' Rowser22222222222222', ' Amodia ', 'male', '11111', ' subabasbas lapulapu city ', '2023/09/23'),
(13, 19, 'Rowser111', 'Amodia', 'male', '09226053498', 'subabasbas lapulapu city', '2023/09/21'),
(14, 23, 'Rowser333', 'Amodia', 'male', '09226053498', 'subabasbas lapulapu city', '2023/09/21'),
(15, 24, 'Rowser444', 'Amodia', 'female', '09226053498', 'subabasbas lapulapu city', '2023/09/24'),
(16, 25, 'Rowser55', 'Amodia', 'female', '09226053498', 'subabasbas lapulapu city', '2023/09/25'),
(17, 26, 'Rowser66', 'Amodia', 'male', '09226053498', 'subabasbas lapulapu city', '2023/09/22'),
(18, 27, 'Rowser777', 'Amodia', 'male', '09226053498', 'subabasbas lapulapu city', '2023/09/22'),
(19, 28, 'Rowser8888888888  ', '  Amodia  ', 'male', '  09226053498  ', '  subabasbas lapulapu city  ', '2023/09/23'),
(20, 31, 'Carl', 'Ngojo', 'male', '09123456789', 'cordova', '2023/09/23'),
(21, 34, 'arjohns', 'dagalas', 'male', '345345', 'subabasbas lapulapu city', '2023/09/28'),
(22, 35, 'Rowser', 'Amodia', 'male', '09226053498', 'subabasbas lapulapu city', '2023/09/28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'customer',
  `classification` varchar(100) NOT NULL DEFAULT 'Non Verified',
  `status` varchar(100) NOT NULL DEFAULT 'Offline now',
  `created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role`, `classification`, `status`, `created`) VALUES
(1, 'admin', 'admin@gmail.com', '21232f297a57a5a743894a0e4a801fc3', 'admin', 'Verified', 'Offline now', ''),
(2, 'test', 'test@gmail.com', '098f6bcd4621d373cade4e832627b4f6', 'customer', 'Non Verified', 'Offline now', '5:49:pm - 2023/09/28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`msg_id`);

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `msg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
