define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        defaults: {
            name       : null,
            surname    : null,
            email      : null,
            pass       : null,
            repeatPass : null
        },

        validation: {
            name: {
                required: true,
                minLength: 2,
                pattern: /^[A-ZА-ЯЄІЇ]'?[a-zа-яєії']*[a-zа-яєії]*\-[A-ZА-ЯЄІЇ][a-zа-яєії']+$|^[A-ZА-ЯЄІЇ][a-zа-яєії']+$/,
                msg: 'Введіть, будь ласка, коректне ім’я'
            },
            surname: {
                required: true,
                minLength: 2,
                pattern: /^[A-ZА-ЯЄІЇ]'?[a-zа-яєії']*[a-zа-яєії]*\-[A-ZА-ЯЄІЇ][a-zа-яєії']+$|^[A-ZА-ЯЄІЇ][a-zа-яєії']+$/,
                msg: 'Введіть, будь ласка, коректне прізвище'
            },
            email: {
                required: true,
                pattern: /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+([a-zA-Z]{2,4}|museum|travel)$/,
                msg: 'Введіть, будь ласка, коректну адресу скриньки'
            },
            pass: {
                required: true,
                pattern: /^(?=.*[a-zа-яєії])(?=.*[A-ZА-ЯЄІЇ])(?=.*[0-9])(?=.{8,})/,
                msg: 'Введіть, будь ласка, коректний пароль'
            },
            repeatPass: {
                required: true,
                equalTo: 'pass',
                msg: 'Введені паролі не співпадають'
            }
        }
    });
    return Model;
});