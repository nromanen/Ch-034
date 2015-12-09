define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Resource = require("../models/ResourceModel"),

     Collection = CMS.Collection.extend({
        model: Resource,
        api: CMS.api,

        url: function() {
            return this.api + "resources";
        }

    });

    return Collection;
});