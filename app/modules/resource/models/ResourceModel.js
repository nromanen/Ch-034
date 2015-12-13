define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: "_id",
        defaults: {
            name: "",
            type: "",
            url: "",
            moduleId: ""
        },

        validate: function(attr, options) {
            var errors = [];
            if (!attr.name) {
                errors.push({inputName: "Name", title: "Пуста назва ресурсу.", message: "Заповніть, будь ласка, назву ресурсу."});
            }
            if (!attr.url) {
                errors.push({inputName: "File", title: "Файл не вибрано.", message: "Виберіть, будь ласка, файл."});
            }
            return errors.length > 0 ? errors : false;
        },

        urlRoot: function() {
            return CMS.api + "modules/" + this.attributes.moduleId + "/resources/";
        }
    });
    return Model;
});