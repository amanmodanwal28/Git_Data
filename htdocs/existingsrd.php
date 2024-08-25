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

    <?php include './headerScript.php'; ?>



</head>

<body>


    <div class="welcome">
        <div class="container-flex">
            <div class="row">
                <div class="col-xs-2">
                    <div class=welcomelogin>

                        <a href="existingsr.php"><button><b>Back</b></button> </a>
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

    <div class="container-flex">
        <div class="row">
            <div class="existingsrrequest">

                <div class="col-xs-12">
                    <div style="padding-left:20px; ">

                        <h1>Existing Service Request</h1>
                        <?php

$csvFilePath = './content/database/registersr.csv';

// Open the CSV file
$file = fopen($csvFilePath, 'r');
$pnr_num=$_POST['pnrnumber'];
$counter=10;
$result=false;
$header=true;
// Read each row of data
 
while (($row = fgetcsv($file)) !== false) {
    // Loop through each cell in the row
    echo '<tr>';
    foreach ($row as $cellValue) {
        // Do something with the cell value
        if($pnr_num==$cellValue ){
            $counter=0;
            $result=true;
        }
        if($result==true && $header==true){
            echo "<div style='overflow-x:auto;'>";

        echo '<table>';
        echo '<tr>
          <th>PNR NUMBER</th>
          <th>PASSENGER NAME</th>
          <th>CONTACT NO&nbsp;&nbsp;&nbsp;</th>
          <th>SEAT NO</th>
          <th>SERVICE TYPE</th>
          <th>COMPLAINT MESSAGE</th>
          <th>SR DATE</th>
          <th>SR TIME</th>
          <th>SERVICE STATUS</th>
          <th>ACTION TAKEN</th>
        </tr>';

            $header=false;
        }
        if($counter<10){
            echo '<td>'.$cellValue.'</td>';
            $counter++;
        }

    }

   if($result==true && $header== false ){
     echo '</tr>';
   }
}
 if($result==true && $header== false ){
 echo '</table>';
}
// Close the file
fclose($file);

if($result==false){
    
    header("Location: existingsr.php"); // Redirect to the new page
    $_SESSION['fail_message'] = "Service Request not registered";
    exit();
}
?>
                    </div>
                </div>
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