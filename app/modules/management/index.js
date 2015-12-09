define(function(require) {
    "use strict";
    return {
        Views: {
            management: require("./views/managementView"),
            managements: require("./views/managementsView"),
            EditViews: {
                Course: require("./views/courseEditView")
            }
        },
        Model: require("./models/managementModel"),
        Collections: {
            Areas     : require("./collections/areasCollection"),
            Groups    : require("./collections/groupsCollection"),
            Courses   : require("./collections/coursesCollection"),
            Modules   : require("./collections/modulesCollection"),
            Tests     : require("./collections/testsCollection"),
            Questions : require("./collections/questionsCollection")
        }
    };
});