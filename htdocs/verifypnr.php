<?php
$pnr_number=$_POST['pnr'];
$status=false;
$filePath = 'content\database\registersr.csv';



if (file_exists($filePath)) {
echo "content\\database\\registersr.csv";

echo $pnr_number;} else {
    echo "File does not exist.";
}
?>