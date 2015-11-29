define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: '_id',
        defaults: {
            name: null,
            published: null,
            succes: null,
            url: null
        },
        urlRoot: function() {
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