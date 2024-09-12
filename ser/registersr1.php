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



    <script>
    window.onload = setTimeout(function() {
        var successMessage =
            "<?php session_start(); echo isset($_SESSION['success_message']) ? $_SESSION['success_message'] : '';$_SESSION['success_message'] = ""; ?>";
        if (successMessage !== "") {
            alert(successMessage);
        }
    }, 500);
    </script>
</head>

<body>


    <div class="welcome">
        <div class="container-flex">
            <div class="row">
                <div class="col-xs-2">
                    <div class=welcomelogin>

                        <a href="index.php"><button><b>back&nbsp;&nbsp;</b></button> </a>
                    </div>
                </div>
                <div class="col-xs-8">
                    <div class="welcomemsg">
                        <marquee>
                            WELCOME TO INDIAN RAILWAYS !!
                        </marquee>
                    </div>
                </div>

                <div class="col-xs-2">
                    <div class=welcomelogin>

                        <a href="attenlogin.php"><button><b>Login&nbsp;&nbsp;</b></button> </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php
include ('_add.php')
?>
    <section id="Attendent_login_body">
        <div class="form-box-register">
            <div class="form-value">
                <form action="registersr.php" method="post">
                    <h2 id="Attendent_login_heading">New Service
                        Request</h2>

                    <div class="inputbox">
                        <input type="text" id="pnrnumber" name="pnrnumber" required>
                        <label class="pnrnumber" for="pnrnumber">PNR
                            Number</label>
                    </div>

                    <div class="inputbox">
                        <input type="text" id="passengername" name="passengername" required>
                        <label class="passengername" for="passengername">Passenger Name</label>
                    </div>

                    <div class="inputbox">
                        <input type="Number" id="contactno" name="contactno" required>
                        <label for="contactno">Contact No</label>
                    </div>
                    <div class="inputbox">
                        <input type="Number" id="seatno" name="seatno" required>
                        <label for="seatno">Seat No</label>
                    </div>
                    <div class="inputbox">
                        <select id="service" name="service" style="width: 310px;height: 20px;" ;>
                            <option value="emergency">Emergency</option>
                            <option value="security">Security</option>
                            <option value="linen">Linen</option>
                            <option value="veg">Veg Food</option>
                            <option value="nonveg">Non Veg</option>
                            <option value="specialcase">Special Case</option>
                        </select>
                        <label for="service">Servicees</label>
                    </div>
                    <div class="inputbox">
                        <textarea id="message" name="message" rows="4" cols="30"
                            placeholder="Enter your Complaint"></textarea>
                        <label for="message">Write your complaint
                            here...</label>
                    </div>

                    <input type="submit" name="Submit" value="Submit" id="register_login_btn">
                    <!-- <button id="register_login_btn" style="background-color: #fff;">Login</button> -->
                </form>

                <form action="existingsr.php" method="post">
                    <input type="submit" name="existingsr" value="Existing" id="register_form_existing">

                </form>

            </div>
        </div>
    </section>
    <!---------------------------------------------------------------------------------------------------------->
    <!--<div class="container1" >-->
    <!--slider---------------->

    <?php
  include ('_footer.php');

  ?>

</body>

</html>