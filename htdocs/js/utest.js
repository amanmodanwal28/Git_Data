  window.onload = setTimeout(function() {
      var successMessage = "<?php session_start(); echo isset($_SESSION['user_message']) ? $_SESSION['user_message'] : '';$_SESSION['user_message'] = ""; ?>";
      if (successMessage !== "") {
        alert(successMessage);
      }
    },500);