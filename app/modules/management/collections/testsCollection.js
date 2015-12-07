define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Management = require("../models/managementModel"),

     Collection = CMS.Collection.extend({
        model: Management,

        url: function() {
            return CMS.api + "tests";
        },

        initialize: function() {
            this.fetch();
        }
    });

    return Collection;
});