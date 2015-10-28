define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),
        Test = require("../models/TestModel"),

    Collection = CMS.Collection.extend({
        model: Test,
        api: CMS.api,
          
        url: function() {
            return this.api + "tests?moduleId=" + this.moduleId;
        },
        
        initialize: function(models, options) {
            this.moduleId = options.moduleId;
        }

    });

    return Collection;
});