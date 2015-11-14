define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Question = require("../models/QuestionModel"),

    Collection = CMS.Collection.extend({
        model : Question,
        api   : CMS.api,
        url: function() {
            return this.api + "questions?courseId=" + this.courseId + "&moduleId=" + this.moduleId;
        },
        initialize: function(models, options) {
            this.courseId = options.courseId;
            this.moduleId = options.moduleId;
        }
    });
    return Collection;
});