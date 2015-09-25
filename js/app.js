$(function() {
    //Popover
    $('[data-toggle="popover"]').popover({container: 'body'});

    //Datepicker
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:2015"
    });

    //Phone number mask
    $("input[name='phonenumber']").mask("(999) 999-99-99");

    jQuery.validator.addMethod("edult", function(value, element) {
        var currentDate = new Date();
        var userAge = new Date(Date.parse(value))
        return this.optional(element) || ((currentDate.getFullYear() - userAge.getFullYear() ) > 18);
    }, "You so young!!!");

    //Localization
    $(".lang").click(function(){
        $(".lang").toggle();
    });

    //Form validation
    $("#regform").validate({
        
        focusCleanup: true,
        onkeyup: false,

        submitHandler: function(form) {
            
        },

        invalidHandler: function(event, validator) {
            validator.valid();
        },

        rules: {
            login: {
                required: true,
                minlength: 5,
                maxlength: 40,
                pattern: /^[A-Za-z0-9\._\-]*$/
            },
            email: {
                required: true,
                email: true
            },
            firstname: {
                required : true,
                minlength : 3,
                maxlength : 30,
                pattern : /^[A-ZА-ЯЄІЇ][\sA-ZА-ЯЄІЇa-zа-яєії'0-9]*$/
            },
            phonenumber: {
               required: true,
               pattern: /^\(050\)|\(066\)|\(095\)|\(099\)/ 
            },
            password: {
                required: true,
                minlength: 8,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
            },
            repeatpassword: {
                required: true,
                minlength: 8,
                equalTo: "#password"
            }
        },

        messages: {
            firstname: {
                required: $('enter your name').html(),
                minlength: $('productNameTooShort').html(),
                maxlength: $('productNameTooLong').html(),
                pattern: $('productNameIllegalCharacters').html()
            },
            birthdate : {
                 required : $('I need date').html(),
                 edult    : $('WTF').html()
            }
        },

        errorPlacement: function(error, element) {
            error.appendTo(element.closest('div'));
        },

        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },

        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        }

    });



    new RegistrationApp.Router();
    Backbone.history.start();
});