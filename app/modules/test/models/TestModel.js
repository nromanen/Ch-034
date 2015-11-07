define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        defaults: {
            id       : null,
            courseId : null,
            moduleId : null,
            nameTest : null
        },
        urlRoot: function() {
            return this.api + "tests?courseId=" + this.courseId + "&moduleId=" + this.moduleId;
        }
        initialize: function(attributes, options) {
            this.courseId = options.courseId;
            this.moduleId = options.moduleId;
        }
    });

    return Model;
});
