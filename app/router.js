define(function(require) {
    "use strict";

    var CMS = require("CMS"),

        CoursesModule = require("modules/course/index"),
        SidebarModule = require("modules/sidebar/index"),
        ModulesModule = require("modules/module/index"),
        RegisterModule = require("modules/register/index"),
        ProfileModule = require("modules/profile/index"),
        TestsModule = require("modules/test/index"),
        Login = require("modules/login/index"),
        NavigationModule = require("modules/navigation/index"),
        ManagementModule = require("modules/management/index"),
        StaticModule = require("modules/static/index"),


    Router = CMS.Router.extend({
        initialize: function() {
            this.userSession = CMS.SessionModel;

            this.mainMenu = new NavigationModule.Model();
            this.mainMenu.setSlug("main_menu");
            this.profileMenu = new NavigationModule.Model();
            this.profileMenu.setSlug("profile_menu");

            this.appView       = new CMS.CoreView();

            this.headerView    = new CMS.Views.Header();
            this.containerView = new CMS.Views.Container();
            this.footerView    = new CMS.Views.Footer();

            this.StaticPagesView = StaticModule.View;
        },
        before: function(params, next) {
            var path = Backbone.history.location.hash,
                session = this.userSession.getItem("UserSession") || null,
                isRestricted = _.contains(CMS.guestPages, path),
                isAuth = session ? session.authenticated : false;
            if (!isRestricted && !isAuth) {
                this.userSession.setItem('UserSession.targetPage', path);
                Backbone.history.navigate("#login", {
                    trigger: true
                });
            } else if (isRestricted && isAuth) {
                Backbone.history.navigate("", {
                    trigger: true
                });
            } else if (isAuth) {
                this.renderHomepage();
                return next();
            } else {
                return next();
            }
        },
        renderHomepage: function() {
            if (!this.appView.getView(this.homeView) || !this.homeView) {

                this.homeView = new CMS.View({
                    views: {
                        "": [
                            this.headerView,
                            this.containerView,
                            this.footerView
                        ]
                    }
                });
                this.appView.setView("#CrsMSContainer", this.homeView);

                this.mainMenu.fetch().done($.proxy(function() {
                    this.headerView.setView(".navigation-menu", new NavigationModule.Views.DefaultView({model: this.mainMenu}));
                    this.headerView.render();
                }, this));
                this.profileMenu.fetch().done($.proxy(function() {
                    var name = this.userSession.getItem("UserSession").profile.name + " " + this.userSession.getItem("UserSession").profile.surname;
                    this.profileMenu.set("title", name);
                    this.headerView.setView(".personal-menu", new NavigationModule.Views.DefaultView({model: this.profileMenu}));
                    this.headerView.render();
                }, this));
                this.appView.render();
            }
        },
        routes: {
            "(/page/:pageNumber)(?*queryParams)": "showCoursesList",
            "login": "showLoginPage",
            "logout": "logoutToLoginPage",
            "register" : "showRegisterPage",
            "profile" : "showProfilePage",
            "copyrights": "showAgreementsPage",
            "report": "showReportPage",
            "courses(/)(/page/:pageNumber)(?*queryParams)": "showCoursesList",
            "courses/:id": "showCourseDetails",
            "courses/:courseId/modules/create": "createCourseModuleDetails",
            "courses/:courseId/modules/:id": "showCourseModuleDetails",
            "courses/:courseId/modules/:id/edit": "editCourseModuleDetails",
            "courses/:courseId/modules/:moduleId/tests/:mode(/:QuestionId)": "showTestModule",
            "management/:page" : "showManagement"
        },
        showLoginPage: function() {
            this.loginView = new Login.View();
            this.appView.setView("#CrsMSContainer", this.loginView);
            this.appView.render();
        },
        logoutToLoginPage: function() {
            this.userSession.logout(function() {
                Backbone.history.navigate("/", {
                    trigger: true
                });
            });
        },
        showRegisterPage: function() {
            this.registerModel  = new RegisterModule.Model();
            this.registerView   = new RegisterModule.View( {model: this.registerModel} );
            this.appView.setView("#CrsMSContainer", this.registerView).render();
        },
        showProfilePage: function() {
            if (this.containerView.getView(".sidebar-a")) {
                this.containerView.getView(".sidebar-a").remove();
            }
            this.profileModel   = new ProfileModule.Model();
            this.profileView    = new ProfileModule.View( {model: this.profileModel} );
            this.containerView.setView(".content", this.profileView).render();
        },
        showAgreementsPage: function(){

            if (this.containerView.getView(".sidebar-a")) {
                this.containerView.getView(".sidebar-a").remove();
            }

            this.StaticPagesView.swapTemplate("agreement");
            this.containerView.setView(".content", this.StaticPagesView);
            this.containerView.render();
        },
        showReportPage: function(){

            if (this.containerView.getView(".sidebar-a")) {
                this.containerView.getView(".sidebar-a").remove();
            }

            this.StaticPagesView.swapTemplate("report");
            this.containerView.setView(".content", this.StaticPagesView);
            this.containerView.render();
        },
        showCoursesList: function(currentPage, queryParams) {
            this.courses = new CoursesModule.Collection();
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
        createCourseModuleDetails: function(courseId) {
            this.module = new ModulesModule.Model([], {courseId: courseId});
            this.containerView.setView(".content", new ModulesModule.Views.CreateModule({model: this.module, courseId: courseId}));
            this.containerView.render();
        },
        editCourseModuleDetails: function(courseId, id) {
            this.module = new ModulesModule.Model({_id: id}, {courseId: courseId});
            this.module.fetch();
            this.containerView.setView(".content", new ModulesModule.Views.CreateModule({model: this.module, courseId: courseId, edit: true}));
        },
        showTestModule: function(courseId, moduleId, modeTest, currentQuestion) {
            this.userAnswers   = new TestsModule.Collection.Answers();
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
                this.containerView.setView(".content", new TestsModule.Views.Tests({collection: this.testsPage}, {mode: 'page', toogleMode: 'list', courseId: courseId, moduleId: moduleId, page: currentQuestion, typeTest: CMS.typeTest, storage: this.userAnswers}));
                this.testsPage.fetch();
            }
        },

        showManagement: function(page){
            switch (page) {
                case "areas":
                    this.containerView.setView(".wrapper", new ManagementModule.Views.managements({collection: new ManagementModule.Collections.Areas(), title: "Напрямки", name: "areas"}));
                    break;
                case "groups":
                    this.containerView.setView(".wrapper", new ManagementModule.Views.managements({collection: new ManagementModule.Collections.Groups(), title: "Групи", name: "groups"}));
                    this.containerView.hrefPath = "management/groups";
                    break;
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