define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Test = require("../models/TestModel"),

    Collection = CMS.PageableCollection.extend({        
        model          : Test,
        currentPage    : 1,
        api            : CMS.api,
        perPage        : 1,
        paginationSize : 12,
        resource       : "tests",

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