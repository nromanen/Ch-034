define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Test = require("../models/TestModel"),

    Collection = CMS.Collection.extend({
        model : Test,
        api   : CMS.api,

        url: function() {
            return this.api + "tests?courseId=" + this.courseId + "&moduleId=" + this.moduleId;
        },
        initialize: function(models, options) {
            this.courseId = options.courseId;
            this.moduleId = options.moduleId;
        }

    });

    return Collection;
});