define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Question = require("../models/QuestionModel"),

    Collection = CMS.PageableCollection.extend({
        model          : Question,
        currentPage    : 1,
        api            : CMS.api,
        perPage        : 1,
        paginationSize : 12,
        resource       : "questions",

        getApiUrl: function() {
            return this.api + "courses/" + this.courseId + "/modules/" + this.moduleId + "/" + this.getResource() + '?_start=' + this.getPageOffset() + '&_limit=' + this.perPage;
        },
        url: function() {
            return this.getApiUrl();
        },
        initialize: function(models, options) {
            this.courseId = options.courseId;
            this.moduleId = options.moduleId;
        }

    });

    return Collection;
});