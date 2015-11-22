define(function(require, exports, module) {
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
            console.log(this);
            this.fetch();
            console.log(this);
        }
    });

     console.log(Collection);

    return Collection;
});