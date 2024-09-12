<?php
session_start();
$username=$_POST['user'];
$password=$_POST['passw'];
if($username == 'attendent' && $password == 'railstaff@12'){
	header("Location: attenstatus.php?selection=both"); // Redirect to the new page
	$_SESSION['user_message'] = "verified";

exit;
}else{
	header("Location: attenlogin.php"); // Redirect to the new page
$_SESSION['user_message'] = "you are not registered user.. ";
exit;
}
?>
