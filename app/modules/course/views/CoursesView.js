define(function(require) {
    "use strict";

    var CMS = require("CMS");

    var CourseView = require("./CourseView");
    var PaginationView = require("./PaginationView");

    var View = CMS.View.extend({
        el: ".courses",

        initialize: function() {
            this.listenTo(this.collection, "reset sync request", this.render);
        },

        render: function() {
            this.$el.html("");
            this.collection.each(this.renderOne, this);
            this.$el.append(new PaginationView({collection: this.collection}).render());
        },

        renderOne: function(model) {
            this.$el.append(new CourseView({
                model: model
            }).render());
        },
        
    });

    return View;
});