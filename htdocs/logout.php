<?php
session_start();

// Destroy the session
	$_SESSION['user_message'] = "";

session_destroy();

// Redirect to login page
header("Location: index.php");
exit;
?>