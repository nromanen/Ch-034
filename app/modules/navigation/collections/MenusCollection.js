define(function(require) {
    var Backbone = require("backbone"),

    Collection = Backbone.Collection.extend({
        initialize: function() {
            this.fetch();
        },
        url: function() {
            return "http://localhost:8888/api/menus" + this.getSlug();
        },
        setSlug: function(slug) {
            this.slug = slug;
        },
        getSlug: function(){
            return this.slug;
        }
    });
    return Collection;
});