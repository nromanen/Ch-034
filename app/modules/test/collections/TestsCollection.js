define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Course = require("../models/TestModel"),

    Collection = CMS.PageableCollection.extend({
        
        model: Course,
        api: CMS.api,
        perPage: 1, 
        paginationSize: 4,
        currentUrl: '#tests/',
        resourse: "tests" 

    });

    return Collection;
});