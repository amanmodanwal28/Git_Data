<?php
// Define the path to the file
//$filePath = '/usr/share/apache2/htdocs/content/database/videoAdvertismentTime.txt';

// Define the path to the file using __DIR__ for an absolute path
$filePath = __DIR__ . '/videoAdvertismentTime.txt';

// Initialize a variable for the content
$fileContent = '';

// Check if the file exists before trying to read it
if (file_exists($filePath)) {
    // Read the file content
    $fileContent = file_get_contents($filePath);

    // Check if the file was read successfully
    if ($fileContent !== false) {
        // Check if the file is empty or contains only whitespace
        $fileContent = trim($fileContent);
        if ($fileContent === '') {
            $fileContent = "The file is blank.";
        }
    } else {
        $fileContent = "Error reading the file.";
    }
} else {
    $fileContent = "File not found.";
}

// Output the file content in JSON format for JavaScript
echo json_encode($fileContent);
?>




<?php
// Define the path to the file
//$filePath = '/usr/share/apache2/htdocs/content/database/videoAdvertismentTime.txt';

// Check if the file exists before trying to read it
// if (file_exists($filePath)) {
//     // Read the file content
//     $fileContent = file_get_contents($filePath);

//     // Check if the file was read successfully
//     if ($fileContent !== false) {
//         // Output the content of the file to the terminal
//         echo $fileContent . PHP_EOL;
//     } else {
//         // Error reading the file
//         echo "Error reading the file." . PHP_EOL;
//     }
// } else {
//     // File does not exist
//     echo "File not found." . PHP_EOL;
// }
//?>