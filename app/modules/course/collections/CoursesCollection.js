define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Course = require("../models/CourseModel"),

    Collection = CMS.PageableCollection.extend({
        
        model: Course,
        currentPage: 1,
        api: CMS.api,
        perPage: CMS.perPage,
        paginationSize: CMS.paginationSize,
        resourse: "courses"

    });

    return Collection;
});