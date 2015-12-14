define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({

        url: function() {
            return CMS.api + "menus/" + this.getSlug();
        },
        initialize: function(attrs, options) {
            if (options && options.slug) {
                this.setSlug(options.slug);
            }
        },
        setSlug: function(slug) {
            this.slug = slug;
        },
        getSlug: function(){
            return this.slug;
        }
    });

    return Model;
});