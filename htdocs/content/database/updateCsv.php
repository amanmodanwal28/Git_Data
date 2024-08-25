<?php
//$csvFilePath = "./registersr.csv";
$csvFilePath = "/usr/share/apache2/htdocs/content/database/registersr.csv";
$updatedPNRNumber = $_POST['pnrNumber'];
$columnName = $_POST['ColumnName'];
$editedValue = ($columnName == "SERVICE STATUS") ? $_POST['ServiceStatus'] : $_POST['EditedValue'];

$csvContent = file_get_contents($csvFilePath);

// Explode CSV content into rows
$rows = explode("\n", $csvContent);
foreach ($rows as &$row) {
    // Explode each row into columns
    $columns = explode(",", $row);
    // Check if the PNR number matches
    if ($columns[0] == $updatedPNRNumber) {
        // Update the value for the specified column
        switch ($columnName) {
            case "ACTION TAKEN":
                $columns[9] = $editedValue; // Assuming 'ACTION TAKEN' is at index 9
                break;
            case "SERVICE STATUS":
                $columns[8] = $editedValue; // Assuming 'SERVICE STATUS' is at index 8
                break;
            // Add more cases for other columns if needed
        }
        // Implode columns back to a row
        $row = implode(",", $columns);
    }
}
$csvContent = implode("\n", $rows);

file_put_contents($csvFilePath, $csvContent);

// Set a cookie with the Service Status value
setcookie('service_status', $editedValue, time() + (86400 * 30), "/"); // 86400 = 1 day

// Respond with a success message and the Service Status value
echo json_encode(['message' => 'CSV file updated successfully', 'service_status' => $editedValue]);
?>



















//<?php
//$csvFilePath = "./registersr.csv";
//$updatedPNRNumber = $_POST['pnrNumber'];
//$columnName = $_POST['ColumnName'];
//$editedValue = $_POST['EditedValue'];
//$csvContent = file_get_contents($csvFilePath);
//$rows = explode("\n", $csvContent);
//foreach ($rows as &$row) {
//    $columns = explode(",", $row);
//    if ($columns[0] == $updatedPNRNumber) {
//        switch ($columnName) {
//            case "ACTION TAKEN":
//                $columns[9] = $editedValue; // Assuming 'ACTION TAKEN' is at index 9
 //               break;
//            case "SERVICE STATUS":
//                $columns[8] = $editedValue; // Assuming 'SERVICE STATUS' is at index 8
//                break;
//        }
//        $row = implode(",", $columns);
//        break;
//    }
//}
//$csvContent = implode("\n", $rows);
//file_put_contents($csvFilePath, $csvContent);
//echo 'CSV file updated successfully';
//?>

















































//<?php
    // Define the path to the CSV file
//$csvFilePath = "./registersr.csv";
  // // Get the updated PNR number and Passenger name from the POST request
//$updatedPNRNumber = $_POST['pnrNumber'];
//$updatedPassengerName = $_POST['passengerName'];
//$updatedContactNo = $_POST['ContactNo'];
//$updatedSeatNo = $_POST['SeatNo'];
//$updatedServices = $_POST['Services'];
//$updatedComplaint = $_POST['Complaint'];
//$formattedDate = $_POST['date'];
//$formattedTime = $_POST['time'];
//$serviceStatus = $_POST['ServiceStatus'];
//$actionTaken = $_POST['ActionTaken'];
   // // Append the new data as a new row
//$newRow = "$updatedPNRNumber,$updatedPassengerName,$updatedContactNo,$updatedSeatNo,$updatedServices,$updatedComplaint,$formattedDate,$formattedTime,$serviceStatus,$actionTaken\n";
  // // Write the new data to the end of the CSV file
//file_put_contents($csvFilePath, $newRow, FILE_APPEND);
  // // Respond with a success message
//echo 'CSV file updated successfully';
//?>





///////////////////////////////perfect code

//<?php
//$csvFilePath = "./registersr.csv";
//$updatedPNRNumber = $_POST['pnrNumber'];
//$updatedPassengerName = $_POST['passengerName'];
//$currentCsvData = file_get_contents($csvFilePath);
//$rows = explode("\n", $currentCsvData);
//$rows[] = "$updatedPNRNumber,$updatedPassengerName";
//$newCsvData = implode("\n", $rows);
//file_put_contents($csvFilePath, $newCsvData);
//echo 'CSV file updated successfully';
//?>









//<?php
//$csvFilePath = "./registersr.csv";
//$updatedCsvData = $_POST['csvData'];
//$currentCsvData = file_get_contents($csvFilePath);
//$rows = explode("\n", $currentCsvData);
//$headers = explode(",", array_shift($rows));
//foreach ($rows as &$row) {
//    $columns = explode(",", $row);
//    if ($columns[0] == $headers[0]) {
//        // Update the data in this row
//        $row = $updatedCsvData;
//        break;
//    }
//}
//    $rows[] = implode(",", $updatedCsvData);
//}
//$newCsvData = implode(",", $headers) . "\n" . implode("\n", $rows);
//file_put_contents($csvFilePath, $newCsvData);
//echo 'CSV file updated successfully';
//?>












//<?php
//$csvFilePath = "./registersr.csv";
//$updatedCsvData = $_POST['csvData'];
//file_put_contents($csvFilePath, $updatedCsvData);

//echo 'CSV file updated successfully';

//?>