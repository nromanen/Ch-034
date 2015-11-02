define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        defaults: {
            name: "",
            url: "",
        }
    });

    return Model;
});