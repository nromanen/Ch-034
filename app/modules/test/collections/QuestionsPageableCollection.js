define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Question = require("../models/QuestionModel"),

    Collection = CMS.PageableCollection.extend({
        model          : Question,
        currentPage    : 1,
        api            : CMS.api,
        perPage        : 1,
        paginationSize : 7,
        resource       : "questions",

        url: function() {
            return this.getApiUrl() + "&courseId=" + this.courseId + "&moduleId=" + this.moduleId;
        },
        initialize: function(models, options) {
            this.courseId = options.courseId;
            this.moduleId = options.moduleId;
        }

    });

    return Collection;
});