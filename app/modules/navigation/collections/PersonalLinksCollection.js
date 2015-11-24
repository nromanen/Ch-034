define(function(require) {
    var Backbone = require("backbone"),

    Collection = Backbone.Collection.extend({
        initialize: function() {
            this.fetch();
        },
        url: function() {
            return "http://localhost:3000/personalLinks";
        },
        getName: function() {
            return "PersonalLinks";
        }
    });
    return Collection;
});