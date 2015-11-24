define(function(require, extend, module) {
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: '_id',
        defaults: {
            courseId: null,
            name: null,
            description: null,
            available: null,
            numberOfTests: null,
            result: null,
            resources: {}
        },
        initialize: function(attributes, options) {

            this.courseId = options.courseId;
        },
        url: function() {
            return this.urlRoot() + this.id;
        },
        urlRoot: function() {
            return CMS.api + "courses/"+this.courseId+"/modules/";
        }
    });
    return Model;
});

