define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        CourseView = require("./CourseView"),
        PaginationView = require("./PaginationView"),
        SidebarView = require("./SidebarView"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/coursesTemplate.html")),

        el: false,

        initialize: function() {
            this.listenTo(this.collection, "reset sync request", this.render);
        },

        serialize: function() {
            return {
                collection: this.collection
            };
        },

        beforeRender: function() {
            this.renderList();
            this.insertViews({
                ".sidebar-a": new SidebarView({collection: this.collection}),
                "nav": new PaginationView({collection: this.collection})
            });
        },

        renderList: function() {
            this.collection.each(this.renderOne, this);
        },

        renderOne: function(model) {
            this.insertView(".courses", new CourseView({
                model: model
            }));
        }
        
    });

    return View;
});