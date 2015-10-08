define(function(require) {
    "use strict";

    var CMS = require("CMS");

    var Course = require("../models/CourseModel");

    var Collection = CMS.PageableCollection.extend({
        
        model: Course,

        api: CMS.api,

        perPage: CMS.perPage,

        paginationSize: CMS.paginationSize,

        resourse: "courses",

    });

    return Collection;
});