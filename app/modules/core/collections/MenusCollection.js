define(function(require) {
    var CMS = require("CMS"),

    Collection = CMS.Collection.extend({
        initialize: function() {
            this.fetch();
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
    return Collection;
});