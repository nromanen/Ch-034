define(function(require, extend, module) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: '_id',
        defaults: {
            courseId: null,
            title: null,
            description: null,
            available: null,
            numberOfTests: null,
            result: null,
            resources: {}
        },
        initialize: function(attributes, options) {
            this.courseId = options.courseId;
        },
        urlRoot: function() {
            return CMS.api + "courses/"+this.courseId+"/modules/";
        },
        validate: function(attr, options) {
            var error = {};
            if (!attr.title) {
                error.title = "Пуста назва модуля";
                error.message = "Заповніть, будь ласка, назву модуля";
            }
            return $.isEmptyObject(error) ? false : error;
        }
    });
    return Model;
});

