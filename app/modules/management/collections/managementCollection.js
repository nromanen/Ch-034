define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),
        Management = require("../models/managementModel"),

     Collection = CMS.Collection.extend({
        model: Management,
        api: CMS.api,

        initialize: function() {
            this.fetch();
        },
        
        url: function() {
            return this.api+"areas";
        }
    });
     console.log()

    return Collection;
});