define(function(require) {
    var Backbone = require("backbone"),

    Model = Backbone.Model.extend({
        initialize: function() {
            this.fetch();
        },
        url: function() {
            return "http://localhost:3000/users/1";
        },
        getName: function() {
            return "User";
        }
    });
    return Model;
});