define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Management = require("../models/managementModel"),

     Collection = CMS.Collection.extend({
        model: Management,

        url: function() {
            return CMS.api + "tests/" + this.testId + "/questions";
        },

        initialize: function(models, options) {
            this.testId = options.id;
            this.fetch();
        }
    });

    return Collection;
});