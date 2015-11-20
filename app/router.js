define(function(require) {
    "use strict";

    var CMS = require("CMS"),

        CoursesModule = require("modules/course/index"),
        SidebarModule = require("modules/sidebar/index"),
        ModulesModule = require("modules/module/index"),
        RegisterModule = require("modules/register/index"),
        TestsModule = require("modules/test/index"),
        Login = require("modules/login/index"),

    Router = Backbone.Router.extend({
        initialize: function() {
            //in progress, commented due demonstration
            //this.userSession = CMS.SessionModel;
            //this.userSession.login({email: "buispr@gmail.com", pass: "diak540910"});
            //this.on("route", this.isAuthenticated);

            this.appView       = new CMS.CoreView();
            this.register      = new RegisterModule.Model();
            this.headerView    = new CMS.Views.Header();
            this.containerView = new CMS.Views.Container();
            this.footerView    = new CMS.Views.Footer();
            this.courses       = new CoursesModule.Collection();
            this.userAnswers   = new TestsModule.Collection.Answers();

            this.renderHomepage();
        },
        renderHomepage: function() {
            this.appView.removeView();
            this.appView.insertViews({"#CrsMSContainer": [
                this.headerView,
                this.containerView,
                this.footerView
            ]});
            this.appView.render();
        },
        //in progress, commented due demonstration
        /*isAuthenticated: function() {
            var path = Backbone.history.location.hash;

            //this.userSession.get('userSession')
            if (true) {

                if (_.contains(CMS.excludedPages, path)) {
                    console.log(path);
                    Backbone.history.navigate(path, {
                        trigger: true
                    })
                } else {
                    Backbone.history.navigate("#register", {
                        trigger: true
                    });
                }
            }
        },*/
        routes: {
            "": "index",
            "(/page/:pageNumber)(?*queryParams)": "showCoursesList",
            "login": "showLoginPage",
            "register" : "showRegisterPage",
            "courses(/)(/page/:pageNumber)(?*queryParams)": "showCoursesList",
            "courses/:id": "showCourseDetails",
            "courses/:courseId/modules/:id": "showCourseModuleDetails",
            "courses/:courseId/modules/:moduleId/tests/:mode(/:QuestionId)": "showTestModule"
        },

        index: function() {
            //this.appView.setView(new Login.View());
        },
        showLoginPage: function() {
            this.appView.setView(new Login.View());
        },
        showRegisterPage: function() {
            this.registerView = new RegisterModule.View( {model: this.register} );
            this.appView.setView("#CrsMSContainer", this.registerView).render();

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

            if (!this.containerView.getView(".sidebar-a")) {
                this.containerView.setView(".sidebar-a", new SidebarModule.View({filterParams: parsedParams}));
                this.containerView.getView(".sidebar-a").render();
            }

            this.courses.setFilterQueries(parsedParams, queryParams);
            this.courses.setCurrentPage(parseInt(currentPage, 10));

            this.courses.fetch()
                .done($.proxy(function() {
                    this.containerView.setView(".content", new CoursesModule.Views.Courses({
                        collection: this.courses,
                        filterParams: parsedParams
                    }));

                    this.containerView.getView(".content").render();
                }, this));
        },

        showCourseDetails: function(id) {
            this.course = new CoursesModule.Model({_id: id});
            this.course.fetch();
            if (this.containerView.getView(".sidebar-a")) {
                this.containerView.getView(".sidebar-a").remove();
            }
            this.containerView.setView(".content", new CoursesModule.Views.CourseDetails({model: this.course, courseId: id}));
        },

        showCourseModuleDetails: function(courseId, id) {
            if (this.containerView.getView(".sidebar-a")) {
                this.containerView.getView(".sidebar-a").remove();
            }
            this.module = new ModulesModule.Model({_id: id}, {courseId: courseId});
            this.containerView.setView(".content", new ModulesModule.Views.Module({model: this.module, courseId: courseId}));
            this.module.fetch();
        },

        showTestModule: function(courseId, moduleId, modeTest, currentQuestion) {
            if (this.containerView.getView(".sidebar-a")) {
                this.containerView.getView(".sidebar-a").remove();
            }
            if(modeTest == 'list-mode'){
                this.testsList = new TestsModule.Collection.List([], {courseId: courseId, moduleId: moduleId});
                this.containerView.setView(".content", new TestsModule.Views.Tests({collection: this.testsList},{mode: 'list', toogleMode: 'page', courseId: courseId, moduleId: moduleId, typeTest: CMS.typeTest, storage: this.userAnswers}));
                this.testsList.fetch();
            }
            else if(modeTest == 'page-mode'){
                this.testsPage = new TestsModule.Collection.Page([], {courseId: courseId, moduleId: moduleId});
                this.testsPage.reset();
                this.testsPage.setCurrentPage(parseInt(currentQuestion));
                this.testsPage.hrefPath = '#courses/' + courseId + '/modules/' + moduleId + '/tests/' + modeTest + '/';
                this.containerView.setView(".wrapper", new TestsModule.Views.Tests({collection: this.testsPage}, {mode: 'page', toogleMode: 'list', courseId: courseId, moduleId: moduleId, page: currentQuestion, typeTest: CMS.typeTest, storage: this.userAnswers}));
                this.testsPage.fetch();
            }
        },

        parseQueryString: function(queryString) {
            if (!_.isString(queryString))
                return;
            queryString = queryString.substring(queryString.indexOf('?') + 1);
            var params = {},
                queryParts = decodeURI(queryString).split(/&/g);

            _.each(queryParts, function(val) {
                    var parts = val.split('=');
                    if (parts.length >= 1) {
                        val = undefined;
                        if (parts.length == 2)
                            if (parts[1].indexOf("'") !== -1 ) {
                                parts[1] = parts[1].slice(1, -1);
                                val = [].concat(parts[1]);
                            } else {
                                val = parts[1].indexOf(",") !== -1 ? parts[1].split(/,/g) : [].concat(parts[1]);
                            }
                        params[parts[0]] = val;
                    }
                });
            return params;
        }
    });

    return Router;
});