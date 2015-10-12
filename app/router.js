define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Courses = require("modules/course/index"),

    Router = Backbone.Router.extend({
        initialize: function() {
            this.core = CMS.CoreView;
            this.courses = new Courses.Collection();
        },

        routes: {
            "": "index",
            "courses(/)(/page/:pageNumber)": "showCoursesList",
            "courses/:id": "showCourseDetails"
        },

        index: function() {
            
        },

        showCoursesList: function(currentPage) {
            this.courses.reset();
            this.courses.setCurrentPage(parseInt(currentPage));
            this.courses.fetch();
            new Courses.Views.Courses({collection: this.courses});
        },

        showCourseDetails: function(id) {
            this.course = new Courses.Model({id: id});
            this.course.fetch();
            new Courses.Views.CourseDetails({model: this.course});

        }
    });

    return Router;

});