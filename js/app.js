$(function() {
    $('[data-toggle="popover"]').popover({container: 'body'});
    $('form').on("click", function(e){
       e.preventDefault();
    });

    // Datepicker
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:2015"
    });

    jQuery.validator.addMethod("edult", function(value, element) {
        var currentDate = new Date();
        var userAge = new Date(Date.parse(value))
        return this.optional(element) || ((currentDate.getFullYear() - userAge.getFullYear() ) > 18);
    }, "You so young!!!");


    // localization
    $(".lang").click(function(){
        $(".lang").toggle();
    });

    // phone-mask
    $("input[name='phonenumber']").mask("(999) 999-99-99");
});

$("#regform").validate({

        errorElement : 'div',
        errorClass: 'error',
        onfocusout : function(element) {
            $(element).valid();
        },
        onfocusin : function(element) {
            
            //$(".error").remove();
        },
        rules : {
            firstname : {
                required : true,
                minlength : 3,
                maxlength : 30,
                pattern : /^[A-ZА-ЯЄІЇ][\sA-ZА-ЯЄІЇa-zа-яєії'0-9]*$/
            },
            phonenumber : {
                required : true
            },
            birthdate : {
                required : true,
                edult    : true
            }
        },
        messages : {
            firstname : {
                required : $('enter your name').html(),
                minlength : $('productNameTooShort').html(),
                maxlength : $('productNameTooLong').html(),
                pattern : $('productNameIllegalCharacters').html()
            },
            birthdate : {
                 required : $('I need date').html(),
                 edult    : $('WTF').html()
            }
        },
        errorPlacement : function(error, element) {
            console.log(error);
            $('#firstnameglyph').attr("title", error.toString);
            error.appendTo(element.closest('div'));  console.log(error.toString);
        }
    });

$('.btn').click(
            function() {
                $("#regform").valid();
            });