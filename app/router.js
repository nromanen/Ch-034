define(function(require) {
    "use strict";

    var CMS = require("CMS"),

        CoursesModule = require("modules/course/index"),
        TestsModule = require("modules/test/index"),

    Router = Backbone.Router.extend({
        initialize: function() {
            
            this.appView = new CMS.CoreView();

            this.headerView = new CMS.Views.Header();
            this.containerView = new CMS.Views.Container();
            this.footerView = new CMS.Views.Footer();
            this.courses = new CoursesModule.Collection();
            this.tests = new TestsModule.Collection();

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
            "courses/:id": "showCourseDetails",
            "tests/:moduleId/:testId": "showTestModule"
        },

        index: function() {
            
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
            
        },

        showTestModule: function(moduleTest, currentQuestion){    
            this.tests.reset();
            this.tests.setCurrentPage(parseInt(currentQuestion));
            this.tests.currentUrl =  '#tests/' + moduleTest + '/'; 
            this.tests.addFilter = '&idModule=' + moduleTest;            

            this.containerView.setView(".wrapper", new TestsModule.Views.Tests({collection: this.tests}));
            this.tests.fetch();                        
        },
        
    });

    return Router;

});