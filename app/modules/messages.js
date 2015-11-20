define(function(require) {
    "use strict";

    var Message = {
            //Regular Expressions:
        nameRegex : /^[A-ZА-ЯЄІЇ]'?[a-zа-яєії']*[a-zа-яєії]*\-[A-ZА-ЯЄІЇ][a-zа-яєії']+$|^[A-ZА-ЯЄІЇ][a-zа-яєії']+$/,
        emailRegex : /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+([a-zA-Z]{2,4}|museum|travel)$/,
        passwordRegex : /^(?=.*[a-zа-яєії])(?=.*[A-ZА-ЯЄІЇ])(?=.*[0-9])(?=.{8,})/,

    //Messages used in popovers:
        nameMsg : 'Введіть, будь ласка, коректне ім’я',
        surnameMsg : 'Введіть, будь ласка, коректне прізвище',
        emailMsg : 'Введіть, будь ласка, коректну адресу електронної скриньки',
        passMsg : 'Введіть, будь ласка, коректний пароль',
        repeatPassMsg : 'Введені паролі не співпадають'
    };



    return Message;
});