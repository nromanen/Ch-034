define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({

        defaults: {
            name: null,
            published: null,
            succes: null,
            url: null
        },
        url: function() {
            return CMS.api + "menus/" + this.getSlug();
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