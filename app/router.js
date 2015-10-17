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

            this.appView.insertViews([
                this.headerView,
                this.containerView,
                this.footerView
            ]);
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
            
            if (this.courses) this.courses.reset();
            this.courses.setCurrentPage(parseInt(currentPage));
            
            this.containerView.setView(".wrapper", new CoursesModule.Views.Courses({collection: this.courses}));
            
            
            this.courses.fetch();
            
            console.log(this.courses);
        },

        showCourseDetails: function(id) {

            this.course = new CoursesModule.Model({id: id});
            
            this.course.fetch();
            this.containerView.setView(".wrapper", new CoursesModule.Views.CourseDetails({model: this.course}));
            
        }
    });

    return Router;

});