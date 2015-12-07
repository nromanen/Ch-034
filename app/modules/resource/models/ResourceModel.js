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

        urlRoot: function() {
            return CMS.api + "modules/" + this.attributes.moduleId + "/resources/";
        }
    });
    return Model;
});