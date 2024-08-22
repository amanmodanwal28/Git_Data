<?php 
//include header
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>PTCS Entertainment</title>
    <meta content="" name="keywords">
    <meta content="" name="description">

    
    <link rel="stylesheet" href="css/register_form.css" />
    <link rel="stylesheet" href="css/Attendent_login.css" />


    <?php include './headerScript.php'; ?>


</head>

<body>


    <div class="welcome">
        <div class="container-flex">
            <div class="row">
                <div class="col-xs-2">
                    <div class=welcomelogin>

                        <a href="registersr1.php"><button><b>Back</b></button> </a>
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

include ('_add.php')

?>

    <section id="Attendent_login_body">
        <div class="form-box">
            <div class="form-value">
                <form action="attenauth.php" method="post">
                    <h2 id="Attendent_login_heading">Attendent Login</h2>
                    <div class="inputbox">
                        <input type="text" name="user" id="user" required>
                        <label for="user">UserName</label>
                    </div>
                    <div class="inputbox">
                        <input type="password" name="passw" id="passw" required>
                        <label for="psw">Password</label>
                    </div>
                    <!-- <button id="loginBtn" class="Attendent_login_btn">Login</button> -->
                    <input type="submit" name="Login" value="Login" class="Attendent_login_btn">
                </form>
            </div>
        </div>
    </section>
    <!---------------------------------------------------------------------------------------------------------->
    <!--<div class="container1" >-->
    <!--slider---------------->

    <?php
//include footer
include 'footer.php';
?>

    <script type="text/javascript" src="js/script.js"></script>


</body>

</html>