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

          $safety_message = $xml->SAFETY_MESSAGE;
          $emergency_message = $xml->EMERGENCY_MESSAGE;
          echo "$emergency_message";

?>
<audio id="emergencyvideo">  
</audio>
<script type="text/javascript">
          let emergency=document.getElementById("emergencyvideo");
              emergency.play();
</script>