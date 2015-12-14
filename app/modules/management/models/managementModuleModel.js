define(function(require, extend, module) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: '_id',
        defaults: {
            courseId: 123,
            name: "",
            description: "",
            available: false,
            numberOfTests: 0,
            result: 0,
            resources: {}
        },
        urlRoot: function() {
            return CMS.api + "courses/"+this.courseId+"/modules/";
        },
        validate: function(attr, options) {
            var error = {};
            if (!attr.name) {
                error.name = "Пуста назва модуля";
                error.message = "Заповніть, будь ласка, назву модуля";
            }
            return $.isEmptyObject(error) ? false : error;
        }
    });
    return Model;
});

