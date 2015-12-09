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
        ResetModule = require("modules/reset/index"),
        ResourcesModule = require("modules/resource/index"),

    Router = CMS.Router.extend({
        initialize: function() {
            this.userSession = CMS.SessionModel;

            this.mainMenu = new NavigationModule.Model();
            this.profileMenu = new NavigationModule.Model();
            this.mainMenu.setSlug("main_menu");
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
                $.when(this.mainMenu.fetch(), this.profileMenu.fetch()).done($.proxy(function() {
                    var name = this.userSession.getItem("UserSession").profile.name + " " + this.userSession.getItem("UserSession").profile.surname;
                    this.profileMenu.set("title", name);
                    this.headerView.setView(".navigation-menu", new NavigationModule.Views.DefaultView({model: this.mainMenu}));
                    this.headerView.setView(".personal-menu", new NavigationModule.Views.DefaultView({model: this.profileMenu}));
                    this.appView.render();
                }, this));
            }
        },
        routes: {
            "(/page/:pageNumber)(?*queryParams)": "showCoursesList",
            "login": "showLoginPage",
            "logout": "logoutToLoginPage",
            "register" : "showRegisterPage",
            "reset": "showResetPage",
            "profile" : "showProfilePage",
            "copyrights": "showAgreementsPage",
            "report": "showReportPage",
            "courses(/)(/page/:pageNumber)(?*queryParams)": "showCoursesList",
            "my-courses(/)(/page/:pageNumber)(?*queryParams)": "showCoursesList",
            "courses/:id": "showCourseDetails",
            "courses/:courseId/modules/create": "createCourseModuleDetails",
            "courses/:courseId/modules/:id": "showCourseModuleDetails",
            "courses/:courseId/modules/:id/edit": "editCourseModuleDetails",
            "courses/:courseId/modules/:moduleId/tests/:mode(/:QuestionId)": "showTestModule",
            "management(/)*page" : "showManagement",
            "courses/:courseId/modules/:id/edit/resources" : "showResourcesList"
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
            this.appView.setView("#CrsMSContainer", this.registerView);
            this.appView.render();
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
        showResetPage: function () {
            this.resetView = new ResetModule.View();
            this.appView.setView("#CrsMSContainer", this.resetView);
            this.appView.render();
        },
        showCoursesList: function(currentPage, queryParams) {
            this.courses = new CoursesModule.Collection();
            var path = this.getCurrentRootPath(),
                parsedParams = {},
                options = {};
                this.courses.locationPath = path;

            if (path.indexOf("my-courses") !== -1) {
                options = {data: $.param({subscribed: true})};
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

            this.courses.fetch(options)
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
            if (this.containerView.getView(".sidebar-a")) {
                this.containerView.getView(".sidebar-a").remove();
            }
            var type, name, collection, editView, subItems, listPath,
                rootPath = this.getCurrentRootPath()+"/"+page;

            switch (page) {
                case "areas":
                    type = "list";
                    name = "Напрямки";
                    collection = new ManagementModule.Collections.Areas();
                    editView = false;
                    listPath = false;
                    break;
                case "groups":
                    type = "list";
                    name = "Типи груп";
                    collection = new ManagementModule.Collections.Groups();
                    editView = false;
                    listPath = false;
                    break;
                case "courses":
                    type = "extended";
                    name = "Курси";
                    collection = new ManagementModule.Collections.Courses();
                    editView = ManagementModule.Views.EditViews.Course;
                    listPath = rootPath+"/modules";
                    break;
                case "tests":
                    type = "extended";
                    name = "Тести";
                    collection = new ManagementModule.Collections.Tests();
                    editView = new ManagementModule.Views.EditViews.Test();
                    listPath = rootPath+"/questions";
                    break;
                case "menus":
                    type = "extended";
                    name = "Меню";
                    collection = new ManagementModule.Collections.Menus();
                    editView = new ManagementModule.Views.EditViews.Menu();
                    listPath = rootPath+"/links";
                    break;
                case "users":
                    type = "list";
                    name = "Користувачі";
                    collection = new ManagementModule.Collections.Users();
                    editView = new ManagementModule.Views.EditViews.User();
                    listPath = false;
                    break;
                default:
                    type = "extended";
                    name = "Курси";
                    collection = new ManagementModule.Collections.Courses();
                    editView = new ManagementModule.Views.EditViews.Course();
                    listPath = this.getCurrentRootPath()+"/courses/modules";
                    break;
            }
            var options = {
                type: type,
                name: name,
                collection: collection,
                editView: editView,
                listPath: listPath,
                newItemPath: rootPath+"/new"
            };

            this.containerView.setView(".content", new ManagementModule.Views.managements(options));
        },

        getCurrentRootPath: function() {
            var path = Backbone.history.location.hash;
            if (path !== '') {
                path = path.match(CMS.Helpers.RegexPatterns.rootPathRegex)[0];
            } else {
                path = "#courses";
            }
            return path;
        },

        showResourcesList: function(courseId, id) {
            this.resources = new ResourcesModule.Collection();
            this.resources.fetch();
            this.containerView.setView(".content", new ResourcesModule.Views.Resources({collection: this.resources, courseId: courseId, moduleId: id}));
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