define(function(require) {
    "use strict";

    var CMS = require("CMS"),

        CoursesModule = require("modules/course/index"),
        ModulesModule = require("modules/module/index"),
        RegisterModule = require("modules/register/index"),
        TestsModule = require("modules/test/index"),
        Login = require("modules/login/index"),

    Router = Backbone.Router.extend({
        initialize: function() {
            
            this.appView = new CMS.CoreView();
            this.register = new RegisterModule.Model();
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
            "courses(/)(/page/:pageNumber)(?*queryParams)": "showCoursesList",
            "courses/:id": "showCourseDetails",
            "courses/:courseId/modules/:id": "showCourseModuleDetails",
            "register" : "showRegisterModule",
            "courses/:courseId/modules/:moduleId/test/:testId": "showTestModule"
        },

        index: function() {
            this.appView.setView( new Login.View() );
        },

        showCoursesList: function(currentPage, queryParams) {
            var parsedParams = {};
            if (this.courses.length) {
                this.courses.reset();
            }

            if (!_.isNull(queryParams)) {

                parsedParams = this.parseQueryString(queryParams);
                parsedParams.area = !_.isEmpty(parsedParams.area) ? parsedParams.area : [];
                parsedParams.group = !_.isEmpty(parsedParams.group) ? parsedParams.group : [];
            }

            this.courses.setFilterQueries(parsedParams, queryParams);

            this.courses.setCurrentPage(parseInt(currentPage, 10));

            this.courses.fetch()
                .done($.proxy(function() {
                    this.containerView.setView(".wrapper", new CoursesModule.Views.Courses({
                        collection: this.courses, 
                        filterParams: parsedParams
                    }));
                    this.containerView.render();
                }, this));
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

        showRegisterModule: function() {
            this.register = new RegisterModule.View( {model: this.register} );
            this.register.render();
        },

        showTestModule: function(courseModule, moduleTest, currentQuestion) {    
            this.tests.reset();
            this.tests.setCurrentPage(parseInt(currentQuestion));
            this.tests.hrefPath =  '#courses/' + courseModule + '/module/' + moduleTest + '/test/';
            this.tests.addFilter = '&idModule=' + moduleTest;            

            this.containerView.setView(".wrapper", new TestsModule.Views.Tests({collection: this.tests}));
            this.tests.fetch();
        },

        parseQueryString: function(queryString) {
            if (!_.isString(queryString))
                return;
            queryString = queryString.substring( queryString.indexOf('?') + 1 );
            var params = {},
                queryParts = decodeURI(queryString).split(/&/g);

            _.each(queryParts, function(val) {
                    var parts = val.split('=');
                    if (parts.length >= 1) {
                        val = undefined;
                        if (parts.length == 2)
                            val = parts[1].indexOf(",") != -1 ? parts[1].split(/,/g) : [].concat(parts[1]);
                        params[parts[0]] = val;
                    }
                });
            return params;
        }
        
    });

    return Router;
});