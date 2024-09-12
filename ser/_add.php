<div class="container-flex">
  <div class="row">

    <div class="col-xs-12">
      <div class="slideshow-container">
       <?php
       $folderPath = 'content/add';
      // Read all files in the folder
       $files = scandir($folderPath);

      // Iterate over each file
       foreach ($files as $file) {
        // Exclude current directory (.) and parent directory (..)
        if ($file !== '.' && $file !== '..') {
            // Process the file
          if(substr($file, strlen($file)-4,strlen($file)-1)==".jpg"){
           echo "<div class='mySlides'>";
           echo "<img src=content/add/".$file.">";
           echo '</div>';
         }
      else if(substr($file, strlen($file)-4,strlen($file)-1)==".png"){
           echo "<div  class='mySlides'>";
           echo "<div id='marquee1' style='overflow:hidden;  width:device-width;  z-index:1 ;'  >";
           echo "<div class='scroll ' style='border: 5px solid black ; margin: 0px;'>";

           echo " <marquee >";
           echo "<div class='wpmd'>";
           echo "<div><div class='imageleftadd' style='width :20% ; float: left; '><img src='content/add/".$file."'></div>";

           echo "<div class='imagerightadd' style='width:80% ; padding-top:50px;'><font color='#ffffff' face='@Meiryo' class='ws28'><B><I> <h2> ".substr($file, 0 , strlen($file)-4)."</h2></I></B></font></div>";
           echo "</div>";
           echo "</div></marquee>";
           echo "</div>";
           echo "</div>";
           echo '</div>';

         
         }

    /*  for play video add uncomment this portion of code
            else if{
              echo "<div class='mySlides '>";
              echo "<video width='100%' height='150' loop muted autoplay >";
              echo "<source src='content/add/".$file."' type='video/mp4'>";
              echo "</video>";
              echo "</div>";
            }
    */   

          }     
        }
        ?>
      </div>
    </div></div></div>

    <script>
      var slideIndex = 1;
      showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        
    /*


    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }



      */
      slides[slideIndex-1].style.display = "block";
   // dots[slideIndex-1].className += " active";
 }

  // Automatic slideshow
  setInterval(function() {
    plusSlides(1);
  }, 23000); // Change slide every 3 seconds
</script>