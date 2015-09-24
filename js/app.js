$(function() {
    $('[data-toggle="popover"]').popover({container: 'body'});
    $('form').on("click", function(e){
       e.preventDefault();
    });

    //Datepicker
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:2015"
    });
});