$(document).ready(function() {
    $('#autoWidth').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $('#autoWidth').removeClass('cs-hidden');
        } 
    });  
  });

$(document).ready(function() {
    $('#autoWidth1').lightSlider({
        autoWidth:true,
        loop:false,
        onSliderLoad: function() {
            $('#autoWidth1').removeClass('cs1-hidden');
        } 

    });  
});
$(document).ready(function() {
    $('#autoWidth2').lightSlider({
        autoWidth:true,
        loop:false,
        onSliderLoad: function() {
            $('#autoWidth2').removeClass('cs2-hidden');
        } 
    });  
});
$(document).ready(function() {
    $('#autoWidth3').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $('#autoWidth3').removeClass('cs3-hidden');
        } 
    });  
});
$(document).ready(function() {
    $('#autoWidth4').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $('#autoWidth4').removeClass('cs4-hidden');
        } 
    });  
});


