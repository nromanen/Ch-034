define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: "_id",
        defaults: {
            name: "",
            type: "",
            url: ""
        }
    });

    return Model;
});