define(function(require) {
    "use strict";
    return {
        View: require("./views/ManagementView"),
        //addViev: require("./views/ManagementAddView"),
        Model: require("./models/managementModel"),
        Collections: {
            Areas: require("./collections/managementCollection"),
        }
    };
});