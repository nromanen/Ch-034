define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Management = require("../models/managementModel"),

     Collection = CMS.Collection.extend({
        model: Management,

        url: function() {
            return CMS.api + "modules/" + this.moduleId + "/tests";
        },

        initialize: function(models, options) {
            this.moduleId = options.id;
            this.fetch();
        }
    });

    return Collection;
});