<?php 
	while($row = mysqli_fetch_assoc($sql)){
		$sql2 = "SELECT * FROM messages WHERE 
		(incoming_msg_id = {$outgoing_id} AND outgoing_msg_id = {$row['user_id']})
		OR 
		(incoming_msg_id = {$row['user_id']} AND outgoing_msg_id = {$outgoing_id})
		ORDER BY timestamp_column DESC LIMIT 1";

		$query2 = mysqli_query($conn, $sql2);
		$row2 = mysqli_fetch_assoc($query2);

		if ($row2) {
			$result = $row2['message'];
			$sender_name = ($row2['outgoing_msg_id'] == $outgoing_id) ? "You" : $row['username'];
		} else {
			continue;
		}

		$timestamp = ($row2['timestamp_column']) ? $row2['timestamp_column'] : 0;

		(strlen($result) > 28) ? $msg =  substr($result, 0, 28) . '...' : $msg = $result;
		($row['status'] == "Offline now") ? $offline = "offline" : $offline = "";


		$output .= '<div class="user-container">
					<a class="text-decoration-none" href="../chatAdmin/chatArea.php?user_id='.$row['user_id'] .' ">
						<div class="content d-flex align-items-center">
							<img src="../../uploads/profileImage/' . $row['p_image'] . '">
							<div class="details">
								<span class="text-capitalize">' . $row['username'] . '</span>
								<p>' . ($row2['outgoing_msg_id'] == $outgoing_id ? 'You: ' : $sender_name . ': ') . $msg .'</p>
							</div>
						</div>
						<small class="timestamp">' . $timestamp . '</small>
						<div class="status-dot '. $offline .' "><i class="bi bi-circle-fill"></i></div>
					</a>
				</div>';
		}

?>