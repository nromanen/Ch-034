define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: '_id',
        defaults: {
            num      : null,
            courseId : null,
            moduleId : null,
            name    : null
        },
        api     : CMS.api,
        urlRoot : CMS.api + 'tests',

        url: function() {
            return this.api + "courses/" + this.courseId + "/modules/" + this.moduleId + "/tests";
        },
        initialize: function(attr, options) {
            this.courseId = options.courseId;
            this.moduleId = options.moduleId;
        }
    });
    return Model;
});
