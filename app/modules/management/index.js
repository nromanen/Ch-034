define(function(require) {
    "use strict";
    return {
        Views: {
            management: require("./views/managementView"),
            managements: require("./views/managementsView"),
        },
        Model: require("./models/managementModel"),
        Collections: {
            Areas: require("./collections/areasCollection"),
            Groups: require("./collections/groupsCollection"),
            Courses: require("./collections/coursesCollection"),
        }
    };
});