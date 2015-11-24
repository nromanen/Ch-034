define(function(require) {
    var Backbone = require("backbone"),

    Collection = Backbone.Collection.extend({
        initialize: function() {
            this.fetch();
        },
        url: function() {
            return "http://localhost:3000/teacherLinks";
        },
        getName: function() {
            return "TeacherLinks";
        }
    });
    return Collection;
});