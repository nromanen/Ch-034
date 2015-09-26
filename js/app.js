$(function() {
    //Popover
    $('[data-toggle="popover"]').popover({container: 'body'});

    //Datepicker
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:2015",
        //dateFormat: 'dd-mm-yy'
    }).change(function() {
        $("#datepicker").blur();
    });;

    jQuery.validator.addMethod("adult", function(value, element) {
        var currentDate = new Date();
        var userAge = new Date(Date.parse(value))
        return this.optional(element) || ((currentDate.getFullYear() - userAge.getFullYear() ) > 18);
    }, "You so young!!!");

    $.validator.addMethod('graduatedValue', function(value, element, param) {
        var begin = new Date( Date.parse($(param).val() ) );
        var finish = new Date( Date.parse( value ) );

        return this.optional( element ) || finish.getFullYear() - begin.getFullYear() <= 5;
    }, 'Термін навчання не повинен перевищувати 5-ти років');

    $.validator.addMethod('checkBegin', function(value, element, param) {
        var begin = new Date( Date.parse($(param).val() ) );
        var finish = new Date( Date.parse( value ) );

        return this.optional( element ) || finish.getFullYear() > begin.getFullYear()
    }, 'Дата вступу до ВНЗ не повинна бути більшою, ніж дата закінчення ВНЗ');

    //Phone number mask
    $("input[name='phonenumber']").mask("(999) 999-99-99");

    jQuery.validator.addMethod("bigLetterName", function(value, element) {
        return this.optional(element) || ((value.search(/(^[А-ЯЄІЇ]{1})|(^[А-ЯЄІЇ]{1}\-[А-ЯЄІЇ]{1})/))!==-1);
    }, "Введіть ім'я з великої букви");

    jQuery.validator.addMethod("bigLetterLastName", function(value, element) {
        return this.optional(element) || ((value.search(/(^[А-ЯЄІЇ]{1})|(^[А-ЯЄІЇ]{1}\-[А-ЯЄІЇ]{1})/))!==-1);
    }, "Введіть прізвище з великої букви");

    //Localization
    $(".lang").click(function(){
        $(".lang").toggle();
    });

    //Form validation
    $("#regform").validate({
        
        focusCleanup: true,
        onkeyup: false,
        blur: true,

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
                pattern : /([а-яєії']+$)|([а-яєії']+\-[а-яєії']+$)/,
                bigLetterName : true
            },
            lastname: {
                required : true,
                minlength : 3,
                maxlength : 30,
                pattern : /([а-яєії']+$)|([а-яєії']+\-[а-яєії']+$)/,
                bigLetterLastName : true
            },
            birthdate: {
                required : true,
                minlength : 3,
                maxlength : 30,
                pattern  : /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/,
                adult    : true
            },            
            phonenumber: {
               required: true,
               pattern: /^\(050\)|\(066\)|\(095\)|\(099\)/ 
            },
            graduated: {
                required: true,
                pattern: /^[А-ЯЄІЇ][а-яєії]+(\s?\-?\s?[А-ЯЄІЇ]?[а-яєії]+)*/
            },
            beginEdu: {
                required: true,
                pattern: /^19[5-9][0-9]$|^20[01][0-9]$/
                },
            finishEdu: {
                required: true,
                pattern: /^19[5-9][0-9]$|^20[01][0-9]$|^2020$/,
                graduatedValue: '#beginEdu',
                checkBegin: '#beginEdu'
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
                required: "Введіть своє ім'я",
                minlength: "Ім'я має містити більше 3 символів",
                maxlength: "Ім'я має містити не більше 30 символів",
                pattern: "Введіть коректне ім'я",
                bigLetterName: "Введіть ім'я з великої букви"
            },
           lastname: {
                required: "Введіть своє прізвище",
                minlength: "Прізвище має містити більше 3 символів",
                maxlength: "Прізвище має містити не більше 30 символів",
                pattern: "Введіть коректне прізвище",
                bigLetterLastName: "Введіть прізвище з великої букви"
            },
            birthdate : {
                 required  : 'I need date',
                 minlength : 'Wrong format',
                 maxlength : 'Wrong format',
                 pattern   : 'Wrong format',
                 adult     : 'You so yang'
            },
            beginEdu: {
                pattern: 'Введіть рік з діапазону 1950-2015'
            },
            finishEdu: {
                pattern: 'Введіть рік з діапазону 1950-2020'
            },
            graduated: {
                pattern: 'Введіть назву ВНЗ, наприклад: <em>Чернівецький Національний університет</em>'
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