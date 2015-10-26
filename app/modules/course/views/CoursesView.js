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
            CMS.Event.on("filter:change", function(event) {
                console.log(event);
            });
        },
        beforeRender: function() {
            this.renderList();
            this.insertViews({
                ".sidebar-a": new SidebarView({filterParams: this.filterParams}),
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