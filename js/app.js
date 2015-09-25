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

    jQuery.validator.addMethod("adult", function(value, element) {
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
        onfocusout: function(element){
            $(element).valid();
            $('[id$="-error"]').i18n();
        },

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
            birthdate: {
                required: true,
                adult: true,
            }
        },

        messages: {
            login: {
                required: "regForm.errors.login.required",
                minlength: "regForm.errors.login.minlength",
                maxlength: "regForm.errors.login.maxlength",
                pattern: "regForm.errors.login.invalidformat",
            },

            email: {
                required: "regForm.errors.email.required",
                email: "regForm.errors.email.invalidformat"
            },

            firstname: {
                required: $('enter your name').html(),
                minlength: $('productNameTooShort').html(),
                maxlength: $('productNameTooLong').html(),
                pattern: $('productNameIllegalCharacters').html()
            },
            birthdate : {
                 required : "I need date",
                 edult    : $('WTF').html()
            }
        },

        errorPlacement: function(error, element) {
            error.attr("data-i18n", "");
            error.appendTo(element.closest('div'));
        },

        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
            
        },

        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        }

    });
    $.i18n.init({
        lng: window.localStorage.getItem("RegistrationFormLang") || "en",
        resGetPath: 'locales/__ns__-__lng__.json',
       
    }).done(function(t) {

        router = new RegistrationApp.Router();
        Backbone.history.start();
    });
    
});