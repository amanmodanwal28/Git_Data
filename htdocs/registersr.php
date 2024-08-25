<?php
// Data to be inserted
session_start();
date_default_timezone_set("Asia/Kolkata");
$data = [
    [$_POST['pnrnumber'],$_POST['passengername'], $_POST['contactno'],$_POST['seatno'],$_POST['service'],$_POST['message'],date('d/m/y'),date('H:i:s'),'open','NO_ACTION_TAKEN']
];

// File path
$filePath = "./content/database/registersr.csv";

// Open the file in write mode
$file = fopen($filePath, 'a');

// Iterate over the data and write to the file
foreach ($data as $row) {
   $success= fputcsv($file, $row);
}

// Close the file
fclose($file);



if ($success !== false) {
header("Location: registersr1.php"); // Redirect to the new page
$_SESSION['success_message'] = "your service request registered successfully.. ";

exit;
} else {
header("Location: registersr1.php"); // Redirect to the new page
$_SESSION['success_message'] = "your service request registration failed ";

exit;
}


?>