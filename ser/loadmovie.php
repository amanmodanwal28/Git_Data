<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>PTCS Entertainment</title>
  <meta content="" name="keywords">
  <meta content="" name="description">
  <link rel="stylesheet" type="text/css" href="css/fetch_advertisment.css" />

  <?php include './headerScript.php'; ?>

</head>

<body>

  <div class="welcome">
    <div class="container-flex">
      <div class="row">
        <div class="col-xs-2">
          <div class=welcomelogin>
            <?php
       $nametype=$_GET['mname'];
       $nametype=substr($nametype, 8,strlen($nametype));
       $nametype=substr($nametype, 0,strpos($nametype, "/"));
       echo "<a href='".$nametype.".php'><button><b>Back</b></button> </a>";
       ?>

          </div>
        </div>
        <div class="col-xs-10">
          <div class="welcomemsg">
            <marquee><B><I>
                  <h1>WELCOME TO INDIAN RAILWAYS !!</h1>
                </I></B></marquee>
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php
  include ('_add.php');
 include ('fetch_advertisement.php');
 include(__DIR__ . '/content/database/videoAdvertismentTime.php');
    ?>


  <div class="container-flex">
    <div class="row">
      <div class="videoplayer">
        <div class="col-lg-9">

          <!-- <h1>
                        Requested content
                    </h1> -->

          <?php
include 'crc.php';

$moviename = $_GET['mname'];
$filePath = 'content/database/INDEX.SYS';

try {
    $data = extractCRCAndFilenames($filePath);
    $crcValues = $data['crc'];
    $filenames = $data['filenames'];

    $fileExists = false;
    $crcMatches = false;

    foreach ($filenames as $index => $filename) {
        if ($filename === $moviename) {
            // Check CRC value
            $filenameCRC32 = sprintf("%08X", crc32($moviename));
//            $crcResult = calculateFileCRC32($moviename);
 //           $checksum = $crcResult['checksum'];

 if ($crcValues[$index] ) {
//            if ($crcValues[$index] === $checksum) {
//            if ($crcValues[$index] === $filenameCRC32) {
//                // CRC matches


$fileExists = true;
                $crcMatches = true;
                break;
            } else {
              $fileExists = true;
              $crcMatches = false;
                break;
            }
        }else{
              $fileExists = false;
              $crcMatches = false;
        }
    }


 ////////////////////// Debugging outputs
 //   echo "File Exists: " . ($fileExists ? "true" : "false") . "<br>";
   // echo "CRC Matches: " . ($crcMatches ? "true" : "false") . "<br>";


    if ($fileExists && $crcMatches) {
        // If both filename and CRC match
        echo "<video id='video-player' controlsList='nodownload' preload='metadata' controls>";
        echo "<source src='". htmlspecialchars($moviename, ENT_QUOTES) ."' type='video/mp4'>";
        echo "</video>";

        // Advertisement Part for video only
        echo "<div id='myModal'>";
        echo "<video id='video_ad' autoplay controls controlsList='nodownload' preload='metadata'></video>";
        echo "<img id='image_ad' style='display: none;'>";
        echo "<progress id='seekbar_ad' value='0' max='100' style='display: none;'></progress>";
        echo "<progress id='seekbar_ad2_img' value='0' max='100' style='display: none;'></progress>";
        echo "</div>";

        // Movie name display
        $songtype1 = substr($moviename, strripos($moviename, "/") + 1);
        echo "<div id='moviename'>";
        echo "<h1>" . rtrim($songtype1, ".mp4") . "</h1>";
        echo "</div>";

    } elseif ($fileExists && !$crcMatches) {
        // If filename exists but CRC does not match
        echo "<h1>Unauthorized video.</h1>";
    } else {
        // If filename does not exist

        echo "<h1>Video not found.</h1>";
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>






        </div>
        <div class="col-lg-3">

          <h1>Content</h1>

          <ul id='video-list'>
            <ul id="playlistItems">
              <?php
                            $moviename1=$_GET['mname'];
                            $songtype=substr($moviename1, 8,strripos($moviename1, "/")-7);
                            $folderPath = "content/poster/".$songtype."";      // Read all files in the folder
                            $files = scandir($folderPath);
                            $processedFiles = array();
                            // Extract folder name from the folder path
                            $folderName = basename($folderPath);
                            //echo $folderName;
                            // Iterate over each file
                            foreach ($files as $file) {
                                // Exclude current directory (.) and parent directory (..)
                                if ($file !== '.' && $file !== '..') {
                                // echo $file;
                                $filenameWithoutExt = pathinfo($file, PATHINFO_FILENAME);
                                //echo $filenameWithoutExt;
                                if (!isset($processedFiles[$filenameWithoutExt])) {
                                    // Check if PNG version of the file exists
                                    if (in_array($filenameWithoutExt . '.png', $files)) {
                                        // If PNG version exists, set the filename to the PNG version
                                        $file = $filenameWithoutExt . '.png';
                                    } else {
                                        // If PNG version doesn't exist, set the filename to the JPG version
                                        $file = $filenameWithoutExt . '.jpg';
                                    }
                                // Process the file
                                //$moviename=str_replace(".jpg",".mp4","$file");

                                $moviename=str_replace([".jpg",".png"],".mp4","$file");
                                    $moviename=str_replace([".jpg",".png"],".mp4","$file");
                                echo "<a href='loadmovie.php?mname=content/".$songtype.$moviename."'>";
                                echo "<img  src='content/poster/".$songtype.$file."' class='model'  loading='lazy' >";
                                echo "</a>";

                                echo "<br><br>";
                                $processedFiles[$filenameWithoutExt] = true;
                                }
                            }
                        }
                            ?>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  </div>


  <?php
    // Include your footer section here
    include('_footer.php');
    ?>



  <script>
  var advertisementFiles = <?php echo json_encode($advertisementFiles); ?>;
  var directory = "<?php echo $directory; ?>";
  // console.log(advertisementVideos); //   complete data of advertisement folder except . and ..
  // Use PHP output directly in JavaScript
  var userTimeInMinute = <?php echo json_encode($fileContent); ?>;
  </script>


  <script src="js/fetch_advertisment.js"></script> <!-- Include separate JavaScript file -->

  <script>
  // Disable right-click context menu
  // document.body.addEventListener('contextmenu', function(event) {
  //   event.preventDefault();
  // });

  // Disable common keyboard shortcuts
  document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' ||
      (event.ctrlKey && event.shiftKey && event.key === 'I') ||
      (event.ctrlKey && event.key === 'U') ||
      (event.ctrlKey && event.key === 'S') ||
      (event.key === 'S' && event.metaKey)) {
      event.preventDefault();
    }
  });

  // Disable text selection
  // document.body.style.userSelect = 'none';

  // Disable context menu on all elements
  // document.querySelectorAll('*').forEach(element => {
  //   element.addEventListener('contextmenu', function(event) {
  //     event.preventDefault();
  //   });
  // });

  // Disable dragging on images
  document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Prevent dragging the image
      img.addEventListener('dragstart', (event) => {
        event.preventDefault();
      });
      // Prevent default drag actions
      img.addEventListener('mousedown', (event) => {
        event.preventDefault();
      });
      img.addEventListener('drag', (event) => {
        event.preventDefault();
      });
    });
  });
  </script>





</body>

</html>