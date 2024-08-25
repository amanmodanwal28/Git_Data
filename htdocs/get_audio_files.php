<?php
$folder = isset($_GET['folder']) ? $_GET['folder'] : 'hindi';
$audioFiles = [];

if (is_dir("content/music/$folder")) {
    $files = scandir("content/music/$folder");
    
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..' && in_array(pathinfo($file, PATHINFO_EXTENSION), array('mp3', 'ogg', 'wav', 'aac','AAC', 'flac','m4a'))) {
            $audioFiles[] = $file;
        }
        else if ($file !== '.' && $file !== '..' && pathinfo($file, PATHINFO_EXTENSION) === 'mp3') {
            $audioFiles[] = $file;
        }
    }
}

echo json_encode($audioFiles);
?>