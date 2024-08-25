<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>PTCS Entertainment</title>
    <meta content="" name="keywords">
    <meta content="" name="description">
    
    
    <link rel="stylesheet" href="css/journey.css" />
   
    <?php include './headerScript.php'; ?>

    <style>
    h2 {
        padding-top: 60px;
        font-family: Arial Helvetica;
        text-align: center;
        font-weight: bold;
        font-size: 33px;
        color: black;
    }
    </style>
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

include ('ujourney.php')

?>

    <!---------------------------------------------------------------------------------------------------------->
    <!--<div class="container1" >-->
    <!--slider---------------->

    <?php
  include ('_footer.php');

  ?>

</body>

</html>