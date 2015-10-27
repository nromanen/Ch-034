define(function(require){
    "use strict";

    var CMS = require("CMS"),
    function isEmail(email) {
        var emailRegex = "/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+([a-zA-Z]{2,4}|museum|travel)$/";
        return emailRegex.test(email);
    }
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

                if (!attr.name) {
                    errors.push("name");
                }

                if (!attr.surname) {
                    errors.push("surname");
                }
                if (!(isEmail(attr.email))) {
                    errors.push("email");
                }

                if (!attr.pass) {
                    errors.push("pass");
                }
                
                if ( !attr.repeatPass ) {
                    errors.push("repeatPass");
                }
                     
                return errors.length > 0 ? errors : false;
            }
        });

    return Model;
});