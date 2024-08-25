<?php
session_start();
if(!($_SESSION['user_message']== 'verified')){
header("Location: index.php"); // Redirect to the new page
exit;
}
 session_start();
$csvFilePath = "./content/database/registersr.csv";

// Open the CSV file
$file = fopen($csvFilePath, 'r');
$pnrnumb=$_GET['id'];
$servicetyp=$_GET['dtype'];
$actiontakenp=$_GET['actiontaken'];


//$pnrnumb='345345345';
//$servicetyp='emergency';
$header=true;
// Read each row of data
$matrix=array();
while (($row = fgetcsv($file)) !== false) {
    // Loop through each cell in the row
	$row1 = array();

	for ($k=0; $k <10 ; $k++) { 
		if($row[0]==$pnrnumb && $row[4]==$servicetyp){
			$row[8] = 'close';
			$row[9] = $actiontakenp;

		}    
	}

	$matrix[] = $row;
}
// Close the file
fclose($file);


// File path
$filePath = "./content/database/registersr.csv";


// Open the file in write mode
$file = fopen($filePath, 'w');

// Iterate over the data and write to the file
foreach ($matrix as $row) {
	$success= fputcsv($file, $row);
}

// Close the file
fclose($file);
if(true){

header("Location: attenstatus.php?selection=both"); // Redirect to the new page
exit();
}
?>