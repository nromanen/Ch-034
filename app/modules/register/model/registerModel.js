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

        validate: function(attr, options) {
            var errors = [];

            if (!(this.isName(attr.name))) {
                errors.push("name");
            }

            if (!(this.isSurname(attr.surname))) {
                errors.push("surname");
            }
            if (!(this.isEmail(attr.email))) {
                errors.push("email");
            }

            if (!(this.isPass(attr.pass))) {
                errors.push("pass");
            }

            if (!(this.isPassEqual(attr.pass, attr.repeatPass))) {
                errors.push("repeatPass");
            }

            return errors.length > 0 ? errors : false;
        },

        isName: function (name) {
            return name.length > 1;
        },

        isSurname: function (surname) {
            return surname.length > 1;
        },

        isEmail: function (email) {
            var emailRegex = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+([a-zA-Z]{2,4}|museum|travel)$/;
            return emailRegex.test(email);
        },

        isPass: function (pass) {
            return pass > 5;
        }

        isPassEqual: function (pass, repeatPass) {
            return pass === repeatPass;
        }
    });

    return Model;
});