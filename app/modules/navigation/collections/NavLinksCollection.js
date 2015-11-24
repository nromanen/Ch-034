define(function(require) {
    var Backbone = require("backbone"),

    Collection = Backbone.Collection.extend({
        initialize: function() {
            this.fetch();
        },
        url: function() {
            return "http://localhost:3000/navLinks";
        },
        getName: function() {
            return "NavLinks";
        }
    });
    return Collection;
});