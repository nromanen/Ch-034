define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        CoursesModule = require("modules/course/index"),
        Login = require("modules/login/index"),
        ResetPassword = require("modules/reset/index"),

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
            "reset" : "reset",            
            "courses(/)(/page/:pageNumber)": "showCoursesList",
            "courses/:id": "showCourseDetails"
        },

        index: function () {
            this.appView.insertView( "#CrsMSContainer", new Login.View() );
        },

        reset: function () {
            new ResetPassword.View( { model: this.reset } );
        },

        showCoursesList: function(currentPage) {
            
            if (this.courses) this.courses.reset();
            this.courses.setCurrentPage(parseInt(currentPage));
            
            this.containerView.setView(".wrapper", new CoursesModule.Views.Courses({collection: this.courses}));
            this.courses.fetch();

        },

        showCourseDetails: function(id) {

            this.course = new CoursesModule.Model({id: id});
            
            this.course.fetch();
            this.containerView.setView(".wrapper", new CoursesModule.Views.CourseDetails({model: this.course}));
            
        }
    });

    return Router;

});