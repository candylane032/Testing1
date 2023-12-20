<?php 
	session_start();
	include '../chatCustomer/config.php';

	$outgoing_id = $_SESSION['user_id'];
	$sql = mysqli_query($conn, "SELECT * FROM users WHERE user_id != {$outgoing_id} AND role = 'admin'");
	$output = "";

	
	echo $output;

?>