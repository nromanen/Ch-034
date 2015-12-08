define(function(require, extend, module) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        urlRoot: function() {
            return CMS.api + "reportmessage";
        }/*,
        validate: function(attr, options) {
            var error = {};
            if (!attr.title) {
                error.title = "Пуста назва модуля";
                error.message = "Заповніть, будь ласка, назву модуля";
            }
            return $.isEmptyObject(error) ? false : error;
        }*/
    });
    return Model;
});

