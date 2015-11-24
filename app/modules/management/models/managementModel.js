define(function(require, extend, module) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: "_id",
        defaults: {
            name: "",
            id  : null,
        }
    });

    return Model;
});