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
            "courses(/)(/page/:pageNumber)": "courses"
        },

        index: function() {
            
        },

        courses: function(currentPage) {
            this.courses.reset();
            this.courses.setCurrentPage(parseInt(currentPage));
            this.courses.fetch();
            new Courses.Views.Courses({collection: this.courses});
        }
    });

    return Router;

});