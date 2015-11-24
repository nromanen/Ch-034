define(function(require) {
    "use strict";

    var Message = {

        //Messages used in popovers:
        nameMsg         : 'Введіть, будь ласка, коректне ім’я',
        surnameMsg      : 'Введіть, будь ласка, коректне прізвище',
        emailMsg        : 'Введіть, будь ласка, коректну адресу електронної скриньки',
        passMsg         : 'Введіть, будь ласка, коректний пароль',
        repeatPassMsg   : 'Введені паролі не співпадають',
        errorWord       : 'Помилка!',
        tryAgain        : 'Заповніть підсвічені поля та спробуйте знову.',
        attentionWord   : 'Увага!',
        fieldsRequired  : 'Всі поля є обов’язковими для заповнення.'
    };

    return Message;
});