define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),
    Module = require("../models/ModuleModel"),

    Collection = CMS.PageableCollection.extend({
        model: Module,
        api: CMS.api,
        perPage: CMS.perPage,
        paginationSize: CMS.paginationSize,
        resourse: "modules"
    });

    return Collection;
});




    