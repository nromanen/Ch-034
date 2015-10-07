define(function(require, exports, module){
    "use strict";

    var app = require("app");

    var Course = Backbone.Model.extend({
        defaults: {
            id: null,
            isPublished: null,
            group: null,
            area: null,
            name: null,
            description: null,
            start: null,
            end: null,
            duration: null,
            schedule: null,
            minStudents: null,
            image: null
        }
    });

    module.exports = Course;

});
