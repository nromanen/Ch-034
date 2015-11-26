define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Question = require("../models/QuestionModel"),

    Collection = CMS.Collection.extend({
        model : Question,
        api   : CMS.api,
        url: function() {
            return this.api + "courses/" + this.courseId + "/modules/" + this.moduleId + "/questions";
        },
        initialize: function(models, options) {
            this.courseId = options.courseId;
            this.moduleId = options.moduleId;
        }
    });
    return Collection;
});