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
                    <div class="welcomelogin">
                        <a href="attenlogin.php"><button type=""><b>Back</b></button> </a>
                    </div>
                </div>
                <div class="col-xs-8">
                    <div class="welcomemsg">
                        <marquee><B><I>
                                    <h1>WELCOME TO INDIAN RAILWAYS !!</h1>
                                </I></B></marquee>
                    </div>
                </div>

                <div class="col-xs-2">
                    <div class=welcomelogin>

                        <a href="logout.php"><button type=""><b>Logout</b></button> </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php
	session_start();
	include ('_add.php');
	include ('./poppup_msg.php')
	?>
	

    <div class="container-flex">
        <div class="row">
            <div class="attenstatus">
                <div class="col-xs-9">
                    <h2>Service Request status</h2>
                </div>
                <div class="col-xs-3">
                    <h2>Welcome Staff</h2>
                </div>
            </div>
        </div>
    </div>
    <div class="container-flex">
        <div class="row">
            <div class="attenstatus">
                <div class="col-xs-12">

                    <?php
	
					$csvFilePath = "./content/database/registersr.csv";

// Open the CSV file
	$file = fopen($csvFilePath, 'r');
// Read each row of data
	$matrix=array();
	while (($row = fgetcsv($file)) !== false) {
    // Loop through each cell in the row
		$row1 = array();
		foreach ($row as $cellValue) {
        // Do something with the cell value
			$row1[] = $cellValue;
		}
		$matrix[] = $row1;
	}
// Close the file
	fclose($file);		
	$counter=0;
	$selectiontype =$_GET["selection"];

	echo "<div class='sorting ' style='text-align: center;'>";
	echo "SERVICE REQUEST SORT BY ";
	echo "<form method='post' name='form1'>";
	if($selectiontype=='open'){
		echo '<td>';
		echo "<select   id='select1'   style='background-color:inherit';  onchange=\"sortstatus('" . $selectiontype . "');\">";
		echo "<option value='open' selected>OPEN</option>";
		echo "<option value='close'>CLOSE</option>";
		echo "<option value='both'>BOTH</option>";
		echo "</select>";
		echo '</td>';
	}else if($selectiontype=='close'){
		echo '<td>';
		echo "<select  id='select1' style='background-color:inherit';  onchange=\"sortstatus('" . $selectiontype . "');\">";
		echo "<option value='open'>OPEN</option>";
		echo "<option value='close' selected>CLOSE</option>";
		echo "<option value='both'>BOTH</option>";
		echo "</select>";
		echo '</td>';
	}else if($selectiontype=='both'){
		echo '<td>';
		echo "<select  id='select1' style='background-color:inherit; ';  onchange=\"sortstatus('" . $selectiontype . "');\">";
		echo "<option value='open'>OPEN</option>";
		echo "<option value='close' >CLOSE</option>";
		echo "<option value='both' selected >BOTH</option>";
		echo "</select>";
		echo '</td>';
	}
	echo "</form>";
	echo "</div>";
	?>
                </div>
            </div>
        </div>
    </div>
    <div class="container-flex">
        <div class="row">
            <div class="attenstatus">
                <div class="col-xs-12">
                    <?php
	echo "<form method='post' name='form'>";
	echo "<div style='overflow-x:auto;'>";
	echo '<table>';
	echo '<tr>
		<th>PNR NUMBER</th>
		<th>PASSENGER NAME</th>
		<th>CONTACT NO</th>
		<th>SEAT NO</th>
		<th>SERVICE TYPE</th>
		<th>COMPLAINT MESSAGE</th>
		<th>SR DATE</th>
		<th>SR TIME</th>
		<th>ACTION TAKEN</th>
		<th>SERVICE STATUS</th>
	</tr>';
	for ($i=(count($matrix)-1); $i >=0 ; $i--) { 
		if($matrix[$i][8]=='open' && $selectiontype=='open'){
			echo '<tr>';	
			echo '<td>' . $matrix[$i][0] . '</td>';
			echo '<td>' . $matrix[$i][1] . '</td>';
			echo '<td>' . $matrix[$i][2] . '</td>';
			echo '<td>' . $matrix[$i][3] . '</td>';
			echo '<td>' . $matrix[$i][4] . '</td>';
			echo '<td>' . $matrix[$i][5] . '</td>';
			echo '<td>' . $matrix[$i][6] . '</td>';
			echo '<td>' . $matrix[$i][7] . '</td>';
			echo "<td><input type='text' id='".$i."' name='actiontaken' placeholder='NO ACTION TAKEN' style='background-color:inherit;' required/></td>";
			echo '<td>';
			echo "<select   name='".$i."'   style='background-color:inherit';  onchange=\"changestatus('" . $matrix[$i][0] . "','" . $matrix[$i][4] . "','" . $i. "');\">";
			echo "<option value='open' selected>OPEN</option>";
			echo "<option value='close'>CLOSE</option>";
			echo "</select>";
			echo '</td>';
			echo '</tr>';
			$counter++;

		}else if ($matrix[$i][8]=='close' && $selectiontype=='close') {

			echo '<tr>';
			echo '<td>' . $matrix[$i][0] . '</td>';
			echo '<td>' . $matrix[$i][1] . '</td>';
			echo '<td>' . $matrix[$i][2] . '</td>';
			echo '<td>' . $matrix[$i][3] . '</td>';
			echo '<td>' . $matrix[$i][4] . '</td>';
			echo '<td>' . $matrix[$i][5] . '</td>';
			echo '<td>' . $matrix[$i][6] . '</td>';
			echo '<td>' . $matrix[$i][7] . '</td>';
			echo '<td>' . $matrix[$i][9] . '</td>';
			echo '<td>';
			echo "CLOSE";

			echo '</td>';
		echo '</tr>';	
			$counter++;
		}else if($selectiontype=='both'){

			echo '<tr>';
			echo '<td>' . $matrix[$i][0] . '</td>';
			echo '<td>' . $matrix[$i][1] . '</td>';
			echo '<td>' . $matrix[$i][2] . '</td>';
			echo '<td>' . $matrix[$i][3] . '</td>';
			echo '<td>' . $matrix[$i][4] . '</td>';
			echo '<td>' . $matrix[$i][5] . '</td>';
			echo '<td>' . $matrix[$i][6] . '</td>';
			echo '<td>' . $matrix[$i][7] . '</td>';

			if( ($matrix[$i][8]=='open') ){
				echo "<td><input type='text' id='". $i ."' name='actiontaken' placeholder='NO ACTION TAKEN' style='background-color:inherit;' required/></td>";
			}else{
				echo '<td>' . $matrix[$i][9] . '</td>';
			}

			if($matrix[$i][8]=='open'){

				echo '<td>';
				echo "<select   name='".$i."'   style='background-color:inherit';  onchange=\"changestatus('" . $matrix[$i][0] . "','" . $matrix[$i][4] . "','" . $i . "');\">";
				echo "<option value='open' selected>OPEN</option>";
				echo "<option value='close'>CLOSE</option>";
				echo "</select>";
				echo '</td>';
			}else{
				echo '<td>';
				echo "CLOSE";
				echo '</td>';
			}
			echo '</tr>';
			$counter++;
		}
	}
	echo '</table>';
	echo "</div>";
	echo '</form>';
	if($counter==0){
		echo "<h2><center> No service request is available </center></h2>";
	}
	?>
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
      
    <script>
    function changestatus(id, dtype, actiontaken) {
        var actiontak = document.getElementById(actiontaken).value;
        if (actiontak != '') {
            var f = document.form;
            f.method = 'post';
            f.action = 'updatesr.php?id=' + id + '&dtype=' + dtype + '&actiontaken=' + actiontak;
            f.submit();
        } else {
            alert("please fill the action taken field");
        }
    }
    </script>
    <script>
    function sortstatus(sort) {
        var f = document.form1;
        f.method = 'post';
        selectElement = document.querySelector('#select1');
        output = selectElement.value;
        f.action = 'attenstatus.php?selection=' + output;
        f.submit();
    }
    </script>

</body>

</html>