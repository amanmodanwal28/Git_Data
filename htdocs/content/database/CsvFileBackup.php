<?php
// $sourceFilePath = "/usr/share/apache2/htdocs/content/database/registersr.csv";
// $backupFilePath = "/usr/share/apache2/htdocs/content/database/backupregistersr.csv";

//$sourceFilePath = "./registersr.csv";
//$backupFilePath = "./backupregistersr.csv";


$sourceFilePath = __DIR__ . "\\registersr.csv";
$backupFilePath = __DIR__ . "\\backupregistersr.csv";

//echo $sourceFilePath ."\n";
//echo $backupFilePath ."\n";

if (file_exists($sourceFilePath)){
    // Check if backup file exists
    if (file_exists($backupFilePath)) {
        // Backup file exists, so copy data from source to backup
        $sourceData = file_get_contents($sourceFilePath);
        file_put_contents($backupFilePath, $sourceData);
        echo "1st work Data from registersr.csv transferred to backupregistersr.csv\n";
    } else {
        // Backup file doesn't exist, create it and copy data
        if (copy($sourceFilePath, $backupFilePath)) {
            echo "1st work backupregistersr.csv created and data from registersr.csv transferred.\n";
        } else {
            echo "1st work Failed to create backupregistersr.csv\n";
        }
    }
}
else{
    $sourceFilePath = __DIR__ . "/registersr.csv";
    $backupFilePath = __DIR__ . "/backupregistersr.csv";
    // Check if backup file exists
    if (file_exists($backupFilePath)) {
        // Backup file exists, so copy data from source to backup
        $sourceData = file_get_contents($sourceFilePath);
        file_put_contents($backupFilePath, $sourceData);
        echo "2nd work Data from registersr.csv transferred to backupregistersr.csv\n";
    } else {
        // Backup file doesn't exist, create it and copy data
        if (copy($sourceFilePath, $backupFilePath)) {
            echo "2nd work backupregistersr.csv created and data from registersr.csv transferred.\n";
        } else {
            echo "2nd work Failed to create backupregistersr.csv\n";
        }
    }
}


?>
