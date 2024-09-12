<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PTCS Entertainment</title>
    <meta content="" name="keywords">
    <meta content="" name="description">
    
    <?php include './headerScript.php'; ?>
</head>

<body>


    <div class="welcome">
        <div class="container-flex">
            <div class="row">

                <div class="col-xs-12">
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

    <div class="container-flex">
        <div class="row">
            <div class="indexmain">

                <div class="col-xs-12">
                    <ul id="autoWidth" class="cs-hidden">
                        <!--1------------------------------------->
                        <li class="item-a">
                            <!--slider-box-->
                            <div class="box">
                                <p class="marvel">MOVIES</p>
                                <!--model-->
                                <a href="movies.php">
                                    <img src="img/home/movies.jpg" class="model">
                                </a>
                            </div>
                        </li>

                        <!--1------------------------------------->
                        <li class="item-a">
                            <!--slider-box-->
                            <div class="box">
                                <p class="marvel">VIDEOS</p>
                                <!--model-->
                                <a href="videos.php">
                                    <img src="img/home/videos.jpg" class="model">
                                </a>
                            </div>
                        </li>

                        <!--1------------------------------------->
                        <li class="item-a">
                            <!--slider-box-->
                            <div class="box">
                                <p class="marvel">MUSIC</p>
                                <!--model-->
                                <a href="music.php">
                                    <img src="img/home/music.jpg" class="model">
                                </a>
                            </div>
                        </li>

                        <!--1------------------------------------->
                        <li class="item-a">
                            <!--slider-box-->
                            <div class="box">
                                <p class="marvel">KIDS ZONE</p>
                                <!--model-->
                                <a href="kidszone.php">
                                    <img src="img/home/kids_zone.jpg" class="model">
                                </a>
                            </div>
                        </li>
                        <!--1------------------------------------->
                        <li class="item-a">
                            <!--slider-box-->
                            <div class="box">
                                <p class="marvel">JOURNEY INFO</p>
                                <!--model-->
                                <a href="journeyinfo.php">
                                    <img src="img/home/journey.jpg" class="model">
                                </a>
                            </div>
                        </li>
                        <!--1------------------------------------->
                        <li class="item-a">
                            <!--slider-box-->
                            <div class="box">
                                <p class="marvel" style=" font-size: 22px;padding-top: 10px;">SERVICE REQUEST</p>
                                <!--model-->
                                <a href="registersr1.php">
                                    <img src="img/home/service.jpg" class="model">
                                </a>
                            </div>
                        </li>
                        <!--1------------------------------------->
                        <li class="item-a">
                            <!--slider-box-->
                            <div class="box">
                                <p class="marvel">TOURIST</p>
                                <!--model-->
                                <a href="tourist.php">
                                    <img src="img/home/tourist.jpg" class="model">
                                </a>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>


        </div>

    </div>
    <!---------------------------------------------------------------------------------------------------------->
    <!--<div class="container1" >-->
    <!--slider---------------->

    <footer>
        <?php
	include ('_footer.php');

	?>

    </footer>

</body>

</html>