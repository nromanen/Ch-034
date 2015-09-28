$(function() {

    //Popover
    $('#regform input').popover({
        container: 'body',
        html: true,
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title" data-i18n></h3><div class="popover-content" data-i18n></div></div>',
        title: function() {
            return "regForm."+$(this).attr("name")+".popover.title";
        },
        content: function() {
            return "[html]regForm."+$(this).attr("name")+".popover.content";
        },
        trigger: 'focus'
    }).focus(function(){
        var popover = $(this).data('bs.popover').tip();
        $(popover).i18n();
    });

    //Datepicker
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1930:2015",
        //dateFormat: 'dd-mm-yy'
    }).change(function() {
        $("#datepicker").blur();
    });;

    //Selection of a country
    $(function() {
        var countriesList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", 
        "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", 
        "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
        "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", 
        "Congo, Republic of the", "Congo, Democratic Republic of the", "Costa Rica", "Cote d'Ivoire", 
        "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
        "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", 
        "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", 
        "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", 
        "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", 
        "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", 
        "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", 
        "Mali", "Malta", "Marshall", "Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", 
        "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", 
        "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", 
        "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", 
        "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "St. Kitts and Nevis", 
        "St. Lucia", "St. Vincent and The Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
        "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", 
        "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", 
        "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", 
        "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
        "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", 
        "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

        var country = document.querySelector("#country");

        function selectCountry() {
            for(var i = 0; i < countriesList.length; i++) {
                var el = document.createElement("li");
                el.innerHTML = "<a role=\"menuitem\" tabindex=\"-1\" href=\"#\">" + 
                    countriesList[i] + "</a>";
                var container = document.getElementById("countriesList");
                container.appendChild(el);    
            }
        };

        $(country).one('click', selectCountry);
        

    }());


    //Phone number mask
    $("input[name='phonenumber']").mask("(999) 999-99-99");

    $.validator.addMethod("adult", function(value, element) {
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

    $.validator.addMethod("bigLetterName", function(value, element) {
        return this.optional(element) || ((value.search(/(^[А-ЯЄІЇ]{1})|(^[А-ЯЄІЇ]{1}\-[А-ЯЄІЇ]{1})/))!==-1);
    }, "Введіть ім'я з великої букви");

    $.validator.addMethod("bigLetterLastName", function(value, element) {
        return this.optional(element) || ((value.search(/(^[А-ЯЄІЇ]{1})|(^[А-ЯЄІЇ]{1}\-[А-ЯЄІЇ]{1})/))!==-1);
    }, "Введіть прізвище з великої букви");
    
    //Form validation
    $("#regform").validate({
        
        focusCleanup: true,
        onkeyup: false,
        blur: true,
        onfocusout: function(element){
            $(element).valid();
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
                pattern: /^[A-Za-z0-9\._\-]*$/,
                remote : {
                    url:  "server/check.php",
                    type: "post"
                }
            },
            email: {
                required: true,
                email: true,
                remote : {
                    url:  "server/check.php",
                    type: "post"
                }
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
            login: {
                required    : "regForm.errors.login.required",
                minlength   : "regForm.errors.login.minlength",
                maxlength   : "regForm.errors.login.maxlength",
                pattern     : "regForm.errors.login.invalidformat",
                remote      : "regForm.errors.login.isset"
            },
            email: {
                required: "regForm.errors.email.required",
                email   : "regForm.errors.email.invalidformat",
                remote  : "regForm.errors.email.isset"
            },
            firstname: {
                required: "regForm.errors.firstname.required",
                minlength: "regForm.errors.firstname.minlength",
                maxlength: "regForm.errors.firstname.maxlength",
                pattern: "regForm.errors.firstname.pattern",
                bigLetterName: "regForm.errors.firstname.bigLetterName"
            },
            lastname: {
                required: "regForm.errors.lastname.required",
                minlength: "regForm.errors.lastname.minlength",
                maxlength: "regForm.errors.lastname.maxlength",
                pattern: "regForm.errors.lastname.pattern",
                bigLetterLastName: "regForm.errors.lastname.bigLetterLastName"
            },
            birthdate : {
                 required  : "regForm.errors.birthdate.required",
                 minlength : "regForm.errors.birthdate.minlength",
                 maxlength : "regForm.errors.birthdate.maxlength",
                 pattern   : "regForm.errors.birthdate.pattern",
                 adult     : "regForm.errors.birthdate.adult"
            },
            beginEdu: {
                required: "regForm.errors.beginEdu.required",
                pattern: "regForm.errors.beginEdu.pattern"
            },
            finishEdu: {
                required: "regForm.errors.finishEdu.required",
                pattern: "regForm.errors.finishEdu.pattern",
                graduatedValue: "regForm.errors.finishEdu.graduatedValue",
                checkBegin: "regForm.errors.finishEdu.checkBegin"
            },
            graduated: {
                required: "regForm.errors.graduated.required",
                pattern: "regForm.errors.graduated.pattern"
            },
            password: {
                required: "regForm.errors.password.required",
                minlength: "regForm.errors.password.minlength",
                pattern: "regForm.errors.password.pattern",
            },
            repeatpassword: {
                required: "regForm.errors.repeatpassword.required",
                minlength: "regForm.errors.repeatpassword.minlength",
                equalTo: "regForm.errors.repeatpassword.equalTo",
            }
        },

        errorPlacement: function(error, element) {
            $(error).attr("data-i18n", error.html()).i18n();
            error.appendTo(element.closest('div'));
        },

        highlight: function(element) {
            $(element).parent().find('.error').remove();
            $(element).closest('.form-group').addClass('has-error');
        },

        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        }

    });

    $.i18n.init({
        lng: App.Helpers.getStoredLang()       
    }).done(function(t) {
        App.registrationView = new App.RegistrationView();
    });
    
});