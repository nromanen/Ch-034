define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        CoursesModule = require("modules/course/index"),

    Router = Backbone.Router.extend({
        initialize: function() {
            
            this.appView = new CMS.CoreView();

            this.headerView = new CMS.Views.Header();
            this.containerView = new CMS.Views.Container();
            this.footerView = new CMS.Views.Footer();
            this.courses = new CoursesModule.Collection();

            this.appView.setViews({"": [
                this.headerView,
                this.containerView,
                this.footerView
            ]});
            this.appView.render();

        },

        routes: {
            "": "index",
            "courses(/)(/page/:pageNumber)": "showCoursesList",
            "courses/:id": "showCourseDetails"
        },

        index: function() {
            
        },

        showCoursesList: function(currentPage) {
            this.containerView.removeView();
            
            if (this.courses) this.courses.reset();
            this.courses.setCurrentPage(parseInt(currentPage));
            this.courses.fetch().done($.proxy(function(data) {
                this.containerView.setViews({
                    ".wrapper": [new CMS.Views.Sidebar(), new CoursesModule.Views.Courses({collection: this.courses})]
                });
                this.containerView.render();
            }, this));
            
        },

        showCourseDetails: function(id) {
            this.containerView.removeView();

            this.course = new CoursesModule.Model({id: id});

            this.course.fetch().done($.proxy(function(data) {
                this.containerView.setView(".wrapper", new CoursesModule.Views.CourseDetails({model: this.course}));
                this.containerView.render();
            }, this));
        }
    });

    return Router;

});