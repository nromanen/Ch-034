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
        urlRoot: function() {
            return CMS.api+"courses/" + this.courseId + "/modules?id=";
        },

        url: function() {
            return this.urlRoot()+this.id;
        },

        initialize: function(attributes, options) {
            this.courseId = options.courseId;
        },
        parse: function(resp, options) {
            return resp[0];
        }

    });

    return Model;
});

