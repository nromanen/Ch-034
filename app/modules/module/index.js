define(function(require, exports, module) {
    "use strict";

    module.exports = {
        Model: require("./models/ModuleModel"),
        Collection: require("./collections/ModulesCollection"),
        Views: {
            Module: require("./views/ModuleView"),
            Modules: require("./views/ModulesView"),
            CreateModule: require("./views/CreateModuleView")
        }
    };
});