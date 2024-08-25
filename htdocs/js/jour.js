setInterval(okup , 3000);
function okup(){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("rj").innerHTML =  this.responseText;
      }
    };
    xhttp.open("get", "ujourney.php", true);
    xhttp.send();
}
