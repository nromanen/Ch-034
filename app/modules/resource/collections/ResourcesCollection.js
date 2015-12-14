define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Resource = require("../models/ResourceModel"),

     Collection = CMS.Collection.extend({
        model: Resource,
        api: CMS.api,

        url: function() {
            return this.api + "modules/" + this.moduleId + "/resources";
        },

        initialize: function(models, options) {
            this.moduleId = options.moduleId;
        },

    });

    return Collection;
});