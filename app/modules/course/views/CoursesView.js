define(function(require, exports, module) {
    "use strict";

    var CourseView = require("./CourseView");
    var PaginationView = require("./PaginationView");

    var CoursesView = Backbone.View.extend({
        el: ".courses",

        initialize: function() {
            this.listenTo(this.collection, "reset sync request", this.render);
        },

        render: function() {
            this.collection.each(this.renderOne, this);
            this.$el.append(new PaginationView({pageNumber: this.collection.pageNumber, totalPages: this.collection.totalPages}).render());
        },

        renderOne: function(model) {
            this.$el.append(new CourseView({
                model: model
            }).render());
        },
        
    });

    module.exports = CoursesView;
});