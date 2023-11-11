<?php 
	session_start();
	include '../chatAdmin/config.php';

	$outgoing_id = $_SESSION['user_id'];
	$sql = mysqli_query($conn, "SELECT * FROM users WHERE user_id != {$outgoing_id} AND role = 'customer'");
	$output = "";

	if(mysqli_num_rows($sql) == 1 ) {
		$output .= " No users available to chat";
		

	}elseif (mysqli_num_rows($sql) > 0) {
		include '../chatAdmin/userData.php';
		
	}
	echo $output;

?>