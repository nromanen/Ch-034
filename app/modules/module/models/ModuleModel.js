define(function(require, extend, module) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({

        defaults: {
            id: null,
            courseId: null,
            title: null,
            description: null,
            resources: {}
        },

        initialize: function(attributes, options) {
            this.courseId = options.courseId;
        },
        urlRoot: function() {
            return CMS.api + "courses/"+this.courseId+"/modules";
        }
        

    });

    return Model;
});

