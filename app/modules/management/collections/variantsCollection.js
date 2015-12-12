define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Management = require("../models/managementModel"),

     Collection = CMS.Collection.extend({
        model: Management,

        url: function() {
            return CMS.api + "questions/" + this.questionId + "/variants";
        },

        initialize: function(models, options) {
            this.questionId = options.id;
            this.fetch();
        }
    });

    return Collection;
});