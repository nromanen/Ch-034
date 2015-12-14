define(function(require) {
    "use strict";
    return {
        Views: {
            management: require("./views/managementView"),
            managements: require("./views/managementsView"),
            menu: require("./views/managementMenuView"),
            EditViews: {
                Course   : require("./views/courseEditView"),
                Test     : require("./views/testEditView"),
                Question : require("./views/questionEditView"),
                Menu     : require("./views/menuEditView"),
                MenuLink : require("./views/menuLinkEditView"),
                Module   : require("./views/moduleEditView")
            }
        },
        Model: require("./models/managementModel"),
        Collections: {
            Areas     : require("./collections/areasCollection"),
            Groups    : require("./collections/groupsCollection"),
            Courses   : require("./collections/coursesCollection"),
            Modules   : require("./collections/modulesCollection"),
            Tests     : require("./collections/testsCollection"),
            Questions : require("./collections/questionsCollection"),
            Variants  : require("./collections/variantsCollection"),
            Menus     : require("./collections/menusCollection"),
            MenuLinks : require("./collections/menuLinksCollection"),
            Users     : require("./collections/usersCollection")
        }
    };
});