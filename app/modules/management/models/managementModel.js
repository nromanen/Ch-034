define(function(require, extend, module) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: "_id",
        defaults: {
            name: "",
            id  : null,
        },

        validate: function(attr, options) {
            var error = {};
            if (!attr.name) {
                error.name = "Поле назви не заповнене";
                error.message = "Заповніть, будь ласка, назву елемента";
            }
            return $.isEmptyObject(error) ? false : error;
        }
    });

    return Model;
});