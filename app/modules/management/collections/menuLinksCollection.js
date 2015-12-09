define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Management = require("../models/managementModel"),

     Collection = CMS.Collection.extend({
        model: Management,

        url: function() {
            return CMS.api + "menus/"+this.menuId+"/links";
        },

        initialize: function(models, options) {
            this.menuId = options.menuId;
            this.fetch();
        }
    });

    return Collection;
});