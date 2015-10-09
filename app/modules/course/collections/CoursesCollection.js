define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Course = require("../models/CourseModel"),

    Collection = CMS.PageableCollection.extend({
        
        model: Course,
        api: CMS.api,
        perPage: CMS.perPage,
        paginationSize: CMS.paginationSize,
        resourse: "courses"

    });

    return Collection;
});