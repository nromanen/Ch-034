define(function(require) {
    "use strict";

    var CMS = require("app");

    var Course = require("../models/CourseModel");

    var Collection = CMS.PageableCollection.extend({

        model: Course,

        api: CMS.api,

        pageSize: CMS.pageSize,

        resourse: "courses",

    });

    return Collection;
});