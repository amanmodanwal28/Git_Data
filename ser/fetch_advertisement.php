
<?php
// Get the list of files in the directory
$directory = "./content/advertisment";
//  ////$advertisementVideos = array_diff(scandir($directory), array('..', '.'));
//$advertisementVideos = array_filter(scandir($directory), function($file) {
//    return !in_array($file, array('.', '..'));
//});




// Get all files in the directory
$advertisementFiles = array_filter(scandir($directory), function($file) {
    return !in_array($file, array('.', '..'));
});

// print_r($advertisementVideos); // Print the contents of the advertisementVideos array


//   // Filter out only video files
//$videoExtensions = array("mp4", "webm", "ogg");

// Define allowed extensions for both video and image files
$allowedExtensions = array("mp4", "webm", "ogg", "jpg", "jpeg", "png", "gif");

//$advertisementVideos = array_filter($advertisementVideos, function($file) use ($videoExtensions) {
//    $extension = pathinfo($file, PATHINFO_EXTENSION);
//    return in_array(strtolower($extension), $videoExtensions);
//});



// Filter out only video and image files
$advertisementFiles = array_filter($advertisementFiles ?? [], function($file) use ($allowedExtensions) {
    $extension = pathinfo($file, PATHINFO_EXTENSION);
    return in_array(strtolower($extension), $allowedExtensions);
});

// Now $advertisementVideos contains paths of advertisement videos
?>