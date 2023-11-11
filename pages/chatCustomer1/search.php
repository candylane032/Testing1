<?php 
	session_start();
	include '../chatCustomer1/config.php';
	$outgoing_id = $_SESSION['user_id'];
	$searchTerm = mysqli_real_escape_string($conn, $_POST['searchTerm']);
	$output = "";
	$sql = mysqli_query($conn, "SELECT * FROM users WHERE username LIKE '%{$searchTerm}%' ");

	if(mysqli_num_rows($sql) > 0){
		include '../chatCustomer1/userData.php';

	}
	else {
		$output = "No user found related to your search term";
	}
	echo $output;
?>