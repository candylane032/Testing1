<?php 
	session_start();
    if(isset($_SESSION['user_id'])){

    	include '../chatAdmin/config.php';
    	$outgoing_id = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
    	$incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    	$output = "";

    	$sql = "SELECT * FROM messages WHERE (outgoing_msg_id = {$outgoing_id} AND incoming_msg_id = {$incoming_id}) 
    			OR (outgoing_msg_id = {$incoming_id} AND incoming_msg_id = {$outgoing_id}) ORDER BY msg_id";

    	$query = mysqli_query($conn, $sql);

    	if(mysqli_num_rows($query) > 0){

    		while($row = mysqli_fetch_assoc($query)) {

    			if($row['outgoing_msg_id'] === $outgoing_id){

    				$output .= '<div class="chat outgoing">
									<div class="details">
										<p>'. $row['message'] .'</p>
									</div>
								</div>';
    			}
    			else {
    				$output .= '<div class="chat incoming">
									<img src="../chatCustomer/customer.png">
									<div class="details">
										<p>'. $row['message'] .'</p>
									</div>
								</div>';

    			}
    		}
    		echo $output;
    	}

    	
    }
    else{
    	header('location: ../index.php');
    }

?>