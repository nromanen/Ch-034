define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        defaults: {
            id:   null,
            name: "",
            url:  "",
        }
    });

    return Model;
});