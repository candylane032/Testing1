<?php 
	session_start();
	include '../chatCustomer/config.php';
	$outgoing_id = $_SESSION['user_id'];
	$searchTerm = mysqli_real_escape_string($conn, $_POST['searchTerm']);
	$output = "";
	$sql = mysqli_query($conn, "SELECT * FROM users WHERE username LIKE '%{$searchTerm}%' ");

	if(mysqli_num_rows($sql) > 0){
		include '../chatCustomer/userData.php';

	}
	else {
		$output = "No user found related to your search term";
	}
	echo $output;
?>