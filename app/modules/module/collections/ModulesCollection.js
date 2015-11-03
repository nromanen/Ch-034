define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),
        Module = require("../models/ModuleModel"),

    Collection = CMS.Collection.extend({
        model: Module,
        api: CMS.api,
        url: function() {
            return this.api+"courses/"+this.courseId+"/modules/";
        },
        
        initialize: function(models, options) {
            this.courseId = options.courseId;
        }
    });

    return Collection;
});