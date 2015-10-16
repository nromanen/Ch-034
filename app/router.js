define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Courses = require("modules/course/index"),
        Login = require("modules/login/index"),
        ResetPassword = require("modules/reset/index"),

    Router = Backbone.Router.extend({
        initialize: function() {
            this.core = CMS.CoreView;
            this.courses = new Courses.Collection();
            this.login = new Login.Model();
            this.reset = new ResetPassword.Model();
        },

        routes: {
            "": "index",
            "reset" : "reset",
            "courses(/)(/page/:pageNumber)": "courses"
        },

        index: function () {
            new Login.View( { model: this.login } );
        },

        reset: function () {
            new ResetPassword.View( { model: this.reset } );
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