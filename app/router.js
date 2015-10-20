define(function(require) {
    "use strict";

    var CMS = require("CMS"),

        CoursesModule = require("modules/course/index"),
        ModulesModule = require("modules/module/index"),
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
            "courses/:courseId/module/:id": "showCourseModuleDetails",
            "courses/:courseId/module/:moduleId/test/:testId": "showTestModule"
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

        showCourseModuleDetails: function(courseId, id) {
            this.module = new ModulesModule.Model({id: id}, {courseId: courseId});
            this.containerView.setView(".wrapper", new ModulesModule.Views.Module({model: this.module}));
            this.module.fetch();  
        },

        showTestModule: function(courseModule, moduleTest, currentQuestion){    
            this.tests.reset();
            this.tests.setCurrentPage(parseInt(currentQuestion));
            this.tests.hrefPath =  '#courses/' + courseModule + '/module/' + moduleTest + '/test/';
            this.tests.addFilter = '&idModule=' + moduleTest;            

            this.containerView.setView(".wrapper", new TestsModule.Views.Tests({collection: this.tests}));
            this.tests.fetch();                        
        }
        
    });

    return Router;

});