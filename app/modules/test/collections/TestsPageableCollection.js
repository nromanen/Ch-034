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
        resourse       : "tests"
    });

    return Collection;
});