define(function(require) {
    "use strict";

    var CMS = require("app");

    var Courses = require("modules/course/index");

    var Router = Backbone.Router.extend({
        initialize: function() {
            this.core = CMS.CoreView;
            this.courses = new Courses.Collection();
        },

        routes: {
            "": "index",
            "courses(/page/:pageNumber)": "courses"
        },

        index: function() {
            
        },

        courses: function(currentPage) {
            this.courses.reset();
            this.courses.setCurrentPage(currentPage);
            this.courses.fetch();
            new Courses.Views.Courses({collection: this.courses});
            
        }
    });

    return Router;

});