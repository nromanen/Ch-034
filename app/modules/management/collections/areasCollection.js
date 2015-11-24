define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Management = require("../models/managementModel"),

     Collection = CMS.Collection.extend({
        model: Management,
        api: CMS.api,

        url: function() {
            return this.api+"areas";
        },

        initialize: function() {
            this.fetch();
        }
    });

    return Collection;
});