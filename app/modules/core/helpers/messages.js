define(function(require) {
    "use strict";

    var Message = {

        //Messages used in popovers:
        nameMsg         : 'Введіть, будь ласка, коректне ім’я',
        surnameMsg      : 'Введіть, будь ласка, коректне прізвище',
        emailMsg        : 'Введіть, будь ласка, коректну адресу електронної скриньки',
        passMsg         : 'Пароль повинен містити велику та маленьку літери, мінімум одну цифру з мінімальною довжиною 8 символів',
        repeatPassMsg   : 'Введені паролі не співпадають',
        errorWord       : 'Помилка!',
        tryAgain        : 'Заповніть підсвічені поля',
        attentionWord   : 'Увага!',
        fieldsRequired  : 'Всі поля є обов’язковими для заповнення.'
    };

    return Message;
});