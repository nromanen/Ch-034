define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        CourseView = require("./CourseView"),
        PaginationView = require("./PaginationView"),
        SidebarView = require("./SidebarView"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/coursesTemplate.html")),
        el: false,

        events: {
            "keypress #search-input": "searchCourse"
        },

        beforeRender: function() {
            this.renderList();
            this.insertView(".sidebar-a", new SidebarView({filterParams: this.filterParams}));
            if (!_.isEmpty(this.collection.models)) {
                this.insertView("nav", new PaginationView({collection: this.collection}));
            }
        },
        renderList: function() {
            this.collection.each(this.renderOne, this);
        },
        renderOne: function(model) {
            this.insertView(".courses", new CourseView({
                model: model
            }));
        },
        searchCourse: function(e) {
            if (e.keyCode === 13) {
                Backbone.history.navigate("#courses?s='"+$(e.target).val()+"'", {trigger: true});
            }
        },
        serialize: function() {
            return {
                courseId: this.id,
            };
        }
    });
    return View;
});