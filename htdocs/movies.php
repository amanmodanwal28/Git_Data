<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>PTCS Entertainment</title>
    <meta content="" name="keywords">
    <meta content="" name="description">
    
    <?php include './headerScript.php'; ?>



</head>

<body>

    <div class="welcome">
        <div class="container-flex">
            <div class="row">
                <div class="col-xs-2">
                    <div class=welcomelogin>

                        <a href="index.php"><button><b>Back</b></button> </a>
                    </div>
                </div>
                <div class="col-xs-10">
                    <div class="welcomemsg">
                        <marquee>WELCOME TO INDIAN RAILWAYS !!</marquee>
                    </div>
                </div>


            </div>
        </div>
    </div>

    <?php
include ('_add.php')
?>




    <?php

function generateMovieList($folderPath) {
    // Read all files in the folder
    $files = scandir($folderPath);

    // Associative array to store filenames without extensions
    $processedFiles = array();
    // Extract folder name from the folder path
    $folderName = basename($folderPath);

    // Iterate over each file
    foreach ($files as $file) {
        // Exclude current directory (.) and parent directory (..)
        if ($file !== '.' && $file !== '..') {
            // Extract filename without extension
            $filenameWithoutExt = pathinfo($file, PATHINFO_FILENAME);

            // Check if filename has been processed before
            if (!isset($processedFiles[$filenameWithoutExt])) {
                // Check if PNG version of the file exists
                if (in_array($filenameWithoutExt . '.png', $files)) {
                    // If PNG version exists, set the filename to the PNG version
                    $file = $filenameWithoutExt . '.png';
                } else {
                    // If PNG version doesn't exist, set the filename to the JPG version
                    $file = $filenameWithoutExt . '.jpg';
                }

                echo "<li>";
                $moviename = str_replace([".jpg", ".png"], ".mp4", $file);
                echo "<div class='box'>";
                echo "<a href='loadmovie.php?mname=content/movies/$folderName/" . $moviename . "'>";
                echo "<img src='content/poster/movies/$folderName/" . $file . "' class='model'>";
                echo "</a>";
                echo "</div>";
                echo "</li>";

                // Mark filename as processed
                $processedFiles[$filenameWithoutExt] = true;
            }
        }
    }
}

?>

    <div class="container-flex">
        <div class="row">
            <div class="movietype">
                <div class="col-xs-12">
                    <h3 class="movies_type_heading_top">
                        Bollywood Movies
                    </h3>
                    <ul id="autoWidth1" class="cs1-hidden">
                        <?php generateMovieList('content/poster/movies/bollywood/'); ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="container-flex">
        <div class="row">
            <div class="movietype">
                <div class="col-xs-12">
                    <h3 class="movies_type_heading_top">
                        Hollywood Movies
                    </h3>
                    <ul id="autoWidth2" class="cs2-hidden">
                        <?php generateMovieList('content/poster/movies/hollywood/'); ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="container-flex">
        <div class="row">
            <div class="movietype">
                <div class="col-xs-12">
                    <h3 class="movies_type_heading_top">
                        Regional Movies
                    </h3>
                    <ul id="autoWidth3" class="cs3-hidden">
                        <?php generateMovieList('content/poster/movies/regional1/'); ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>





    <!---------------------------------------------------------------------------------------------------------->
    <!--<div class="container1" >-->
    <!--slider---------------->

    <?php
  include ('_footer.php');

  ?>



</body>

</html>