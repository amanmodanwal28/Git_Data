<!DOCTYPE html>
<html>
<head>
    <title>Popup Message</title>
    <style>
        .popup-container {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 999;
        }
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }

        #popupmsg{
            color:black
        }

        .popup-container h2 {
            margin-top: 0;
            margin: 0;
            font-size: 1.5em;
            font-weight: bold;
        }
        .button-container {
            text-align: center;
        }
        #button-container #yes,
        #button-container #no {
            margin: 10px;
            padding: 10px 20px;
            border: none;
            background-color: #007bff;
            background: #007bff;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
            height: auto;
            width: auto;
        }
    </style>

</head>
<body>


<!-- <button  onclick="showPopup()">check</button> -->
<div id="overlay" class="overlay" onclick="closePopup()"></div>

<div id="popup" class="popup-container">
    <h2 id="popupmsg">Are you okay?</h2>
    <div id="button-container">
        <button id="yes" onclick="closePopup()"> Yes</button>
        <button id="no" onclick="closePopup()">No</button>
    </div>
</div>
    <script>
        function showPopup() {
            document.getElementById("popup").style.display = "block";
            document.getElementById("overlay").style.display = "block";
        }

        function closePopup() {
            document.getElementById("popup").style.display = "none";
            document.getElementById("overlay").style.display = "none";
            // Here you can perform further actions if needed, like sending the user's choice to the server
        }
    </script>


<?php
// Set the timezone to India (Asia/Kolkata)
date_default_timezone_set('Asia/Kolkata');
//session_start();
// Function to check if the popup was shown today
function wasPopupShownToday() {
    // Check if the 'popup_shown_date' session variable is set and if it's today
    if(isset($_SESSION['popup_shown_date']) && $_SESSION['popup_shown_date'] === date("Y-m-d")) {
        //echo "yes";
        return true;
        
    } else {
        //echo "no";
        return false;
    }
}
// Check if the popup should be shown based on the current time and if it hasn't been shown before today
if (!wasPopupShownToday() && date("H:i:s") >= "00:00:00") {
    echo "<script>showPopup();</script>";
    // Set the 'popup_shown_date' session variable to mark that the popup was shown today
    $_SESSION['popup_shown_date'] = date("Y-m-d");
}
?>

<script>
    const yes =document.getElementById("yes")
        yes.addEventListener("click", function(){
            console.log("click")
            <?php include('./content/database/CsvFileBackup.php');?>
        })
</script>

</body>
</html>


















<!-- <!DOCTYPE html>
<html>
<head>
    <title>Popup Message</title>
    <style>
        .popup-container {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        .popup-container h2 {
            margin-top: 0;
        }
        .button-container {
            text-align: center;
        }
        .button-container button {
            margin: 10px;
            padding: 10px 20px;
            border: none;
            background-color: #007bff;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>

</head>
<body>

<div id="overlay" class="overlay" onclick="closePopup()"></div>

<div id="popup" class="popup-container">
    <h2>Are you okay?</h2>
    <div class="button-container">
        <button onclick="closePopup()">Yes</button>
        <button onclick="closePopup()">No</button>
    </div>
</div>

<button onclick="showPopup()">Show Popup</button>
    <script>
        function showPopup() {
            document.getElementById("popup").style.display = "block";
            document.getElementById("overlay").style.display = "block";
        }

        function closePopup() {
            document.getElementById("popup").style.display = "none";
            document.getElementById("overlay").style.display = "none";
        }
    </script>
</body>
</html> -->




















<!-- <!DOCTYPE html>
<html>
<head>
    <title>Popup Message</title>
    <script>
        function showPopup() {
            var response = confirm("Are you okay?");
            if (response == true) {
                alert("Glad to hear that!");
            } else {
                alert("Hope you feel better soon!");
            }
        }
    </script>
</head>
<body>

<button onclick="showPopup()">Click me</button>

</body>
</html> -->
