define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Management = require("../models/managementModel"),

     Collection = CMS.Collection.extend({
        model: Management,

        url: function() {
            return CMS.api + "courses/" + this.courseId + "/modules";
        },

        initialize: function(models, options) {
            this.courseId = options.id;
            this.fetch();
        }
    });

    return Collection;
});