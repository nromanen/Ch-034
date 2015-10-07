define(function(require, exports, module) {
    "use strict";

    var CoursesView = require("./CoursesView");
    var PaginationView = require("./PaginationView");

    var ModuleView = Backbone.View.extend({

        el: ".courses",



        render: function() {
            this.$el.html(""); 

            this.$el.append(new CoursesView({collection: this.collection}).render().el);
            this.$el.append(new PaginationView({pageNumber: this.collection.pageNumber, totalPages: this.collection.totalPages}).render().el);
        },
        
    });

    module.exports = ModuleView;
});