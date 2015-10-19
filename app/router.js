define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Courses = require("modules/course/index"),
        Tests = require("modules/test/index"),

    Router = Backbone.Router.extend({
        initialize: function() {
            this.core = CMS.CoreView;
            this.courses = new Courses.Collection();
            this.tests = new Tests.Collection();
        },

        routes: {
            "": "index",
            "courses(/)(/page/:pageNumber)": "courses",
            "tests/:moduleId/:testId": "tests"  
        },

        index: function() {
            
        },

        courses: function(currentPage) {
            this.courses.reset();
            this.courses.setCurrentPage(parseInt(currentPage));
            this.courses.fetch();
            new Courses.Views.Courses({collection: this.courses});
        },

        tests: function(moduleTest, currentQuestion){     
            this.tests.reset();
            this.tests.setCurrentPage(parseInt(currentQuestion));
            this.tests.currentUrl =  '#tests/' + moduleTest + '/'; 
            this.tests.addFilter = '&idModule=' + moduleTest;            

            this.tests.fetch();  
            new Tests.Views.Tests({collection: this.tests});
        }
        
    });

    return Router;

});