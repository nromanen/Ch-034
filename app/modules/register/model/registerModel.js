define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    Message = require("modules/messages"),

    RegexPattern = require("modules/regexPatterns"),

    Model = CMS.Model.extend({

        defaults: {
            name       : null,
            surname    : null,
            email      : null,
            password   : null,
            repeatPass : null
        },
        urlRoot: "http://localhost:8888/api/register",
        validation: {
            name: {
                required: true,
                minLength: 2,
                pattern: RegexPattern.nameRegex,
                msg: Message.nameMsg
            },
            surname: {
                required: true,
                minLength: 2,
                pattern: RegexPattern.nameRegex,
                msg: Message.surnameMsg
            },
            email: {
                required: true,
                pattern: RegexPattern.emailRegex,
                msg: Message.emailMsg
            },
            password: {
                required: true,
                pattern: RegexPattern.passwordRegex,
                msg: Message.passMsg
            },
            repeatPass: {
                required: true,
                equalTo: 'password',
                msg: Message.repeatPassMsg
            }
        }
    });
    return Model;
});