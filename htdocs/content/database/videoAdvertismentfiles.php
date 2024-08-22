<?php
//$advertismentDirectory = '/usr/share/apache2/htdocs/content/advertisment'; // Replace this with the path to your advertisement directory
$advertismentDirectory = __DIR__ . '/../advertisment'; // Navigate up one directory and then to 'advertisment'

// Check if the directory exists
if (is_dir($advertismentDirectory)) {
    // Open the directory
    if ($dh = opendir($advertismentDirectory)) {
        // Read directory entries
        while (($file = readdir($dh)) !== false) {
            // Skip . and .. entries
            if ($file != "." && $file != "..") {
                // Output the URL for each file in the directory
                echo "http://192.168.0.243/content/advertisment/$file\n"; // Replace "your-server-url.com" with your server URL
            }
        }
        closedir($dh); // Close the directory handle
    }
} else {
    echo "Directory not found.";
}
?>