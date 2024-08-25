<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>PTCS Entertainment</title>
    <meta content="" name="keywords">
    <meta content="" name="description">

    <link rel="stylesheet" href="css/music/mainPage.css" />
    <link rel="stylesheet" href="css/music/side-playlist.css" />
    <link rel="stylesheet" href="css/music/responsive.css" />
    <script type="text/javascript" src="js/music.js"></script>

    <?php include './headerScript.php'; ?>

</head>

<body>

    <div class="welcome">
        <div class="container-flex">
            <div class="row">
                <div class="col-xs-2">
                    <div class=welcomelogin style="margin:-5px;">

                        <a href="index.php"><button><b>Back</b></button> </a>
                    </div>
                </div>
                <div class="col-xs-10">
                    <div class="welcomemsg" style="margin:-5px;">
                        <marquee>WELCOME TO INDIAN RAILWAYS !!</marquee>
                    </div>
                </div>


            </div>
        </div>
    </div>


    <?php

include ('_add.php')

?>


    <div id="folderSelect">
        <div class="music_box" data-folder="hindi">

            <!--model-->
            <a>
                <img src="img/home/hindi.png" class="model">
            </a>
        </div>
        <div class="music_box" data-folder="english">

            <!--model-->
            <a>
                <img src="img/home/english.png" class="model">
            </a>
        </div>
        <div class="music_box" data-folder="regional1">

            <!--model-->
            <a>
                <img src="img/home/Regional_1.png" class="model">
            </a>
        </div>
        <div class="music_box" data-folder="regional2">

            <!--model-->
            <a>
                <img src="img/home/Regional_2.png" class="model">
            </a>
        </div>
    </div>





    <aside class="playlist">
        <h1>Playlist</h1>
        <!--------- playlist songs --------->
        <div class="song-container">

            <p id="playlistItems">Warriyo-mortals</p>

        </div>

    </aside>
    <!--------------------------- MasterPlay section - Bottom ------------------>
    <section class="masterPlay">
        <div class="leftside">
            <div class="song-details ">
                <div class="title">
                    <marquee id="songtitle">&nbsp;&nbsp;&nbsp;&nbsp;</marquee><br>
                </div>
            </div>

        </div>
        <div class="middle">
            <audio id="audioPlayer" controls controlsList="nodownload">
                Your browser does not support the audio element.
            </audio>
            <!-- <audio src="./assests/linkin-park.mp3" controls></audio> -->
            <!-- <img src="./assests/icons/shuffle.png">
            <img src="./assests/icons/repeat.png">
            <img src="./assests/icons/expand-arrows.png" class="expand"> -->
        </div>
    </section>



    <!---------------------------------------------------------------------------------------------------------->
    <!--<div class="container1" >-->
    <!--slider---------------->


</body>

</html>