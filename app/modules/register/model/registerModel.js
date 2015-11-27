define(function(require) {
    "use strict";

    var CMS = require("CMS"),

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
                pattern: CMS.Helpers.RegexPatterns.nameRegex,
                msg: CMS.Helpers.Messages.nameMsg
            },
            surname: {
                required: true,
                minLength: 2,
                pattern: CMS.Helpers.RegexPatterns.nameRegex,
                msg: CMS.Helpers.Messages.surnameMsg
            },
            email: {
                required: true,
                pattern: CMS.Helpers.RegexPatterns.emailRegex,
                msg: CMS.Helpers.Messages.emailMsg
            },
            password: {
                required: true,
                pattern: CMS.Helpers.RegexPatterns.passwordRegex,
                msg: CMS.Helpers.Messages.passMsg
            },
            repeatPass: {
                required: true,
                equalTo: 'password',
                msg: CMS.Helpers.Messages.repeatPassMsg
            }
        }
    });
    return Model;
});