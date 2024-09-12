<?php 
$xmlFile = 'content/database/papis_info.xml';
$xml = simplexml_load_file($xmlFile);

if ($xml === FALSE) {
    echo "There were errors parsing the XML file.\n";
    foreach(libxml_get_errors() as $error) {
        echo $error->message;
    }
    exit;
}
          $speed = $xml->SPEED;
          $adtns = $xml->ADTNS;
          $late_run_status = $xml->LRS;
          $source_station = $xml->SS;
          $previous_station = $xml->PS;
          $current_station= $xml->CS;
          $next_station = $xml->NS;
          $destination_station = $xml->DS;
          $safety_message = $xml->SAFETY_MESSAGE;
          $emergency_message = $xml->EMERGENCY_MESSAGE;


echo "<div class='mainhead '  id='rj'>";
echo "<h2 style='padding-top: 60px;font-family: Arial Helvetica; text-align:center; font-weight: bold;font-size: 33px;  '>Journey Info</h2>";
echo "<div class='leftjourney'>";
echo "<div class='circle' > SOURCE STATION<div class='text'>".$source_station."</div></div>";
echo "<div class='linev' style='  border-left: 6px solid green; margin-top: -20px;margin-bottom: 0px;'></div>";
if( trim($current_station) == trim($previous_station) ){
 echo "<div class='circle' id='current'>PREVIOUS STATION<div class='text'><span> ".$previous_station." </span></div></div>";
}else{
 echo "<div class='circle' id='current'>CURRENT STATION<div class='text'><span> ".$current_station." </span></div></div>";
}
echo "<div class='linev' style='  border-left: 6px solid green; margin-top: -20px;margin-bottom: 0px;'></div>";
echo "<div class='circle'>NEXT STATION<div class='text'><span> ".$next_station." <span></div></div>";
echo "<div class='linev' style='  border-left: 6px solid green; margin-top: -20px;margin-bottom: 0px;'></div>";
echo "<div class='circle'>DEST STATION<div class='text'><span> ".$destination_station." <span></div></div>";
echo"<br><br>";
echo "</div>";
echo"<br><br>";
echo "<div class='rightjourney'>";
echo "<table >";
echo "<tr>";
echo "<td style='font-family: Arial Helvetica;text-align:center; font-weight: bold;font-size: 23px;  ' >Speed</td>";
echo "<td style=';text-align:center; font-size: 15px;font-style: italic;  ' >".$speed." KMPH</td>";
echo "</tr> <tr>";
echo "<td style='font-family: Arial Helvetica;text-align:center; font-weight: bold;font-size: 23px;  ' >Approx Distance to next Station</td>";
echo "<td style='text-align:center; ;font-size: 15px; font-style: italic; ' >".$adtns." KMs</td>";
echo "</tr> <tr >";
echo "<td style='font-family: Arial Helvetica;text-align:center; font-weight: bold;font-size: 23px;  ' >Late Running Status  (HH/MM)</td>";
echo "<td style='text-align:center; font-size: 15px; font-style: italic; ' > ".$late_run_status." </td>";
echo "</tr> ";
echo "</table></div>";
echo"<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>";
echo "</div>";
?>