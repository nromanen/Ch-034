define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        url: CMS.api + 'profile',

        defaults: {
            name   : null,
            surname: null,
            email:   null,
            avatar:  null,
            social: {
                phone:      null,
                skype:      null,
                linkedin:   null,
                fb:         null,
                vk:         null
            },
            password:   null
        },

        validation: {
            name: {
                required:  true,
                minLength: 2,
                pattern:   CMS.Helpers.RegexPatterns.nameRegex,
                msg:       CMS.Helpers.Messages.nameMsg
            },
            surname: {
                required:  true,
                minLength: 2,
                pattern:   CMS.Helpers.RegexPatterns.nameRegex,
                msg:       CMS.Helpers.Messages.surnameMsg
            },
            email: {
                required:  true,
                pattern:   CMS.Helpers.RegexPatterns.emailRegex,
                msg:       CMS.Helpers.Messages.emailMsg
            },
            password: {
                msg:       CMS.Helpers.Messages.passMsg
            },
            repeatPass: {
                msg:        CMS.Helpers.Messages.repeatPassMsg
            }
        },
    });
    return Model;
});