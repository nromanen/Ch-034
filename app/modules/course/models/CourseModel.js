define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
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
            image: null,
            modules: []
        },

        urlRoot: CMS.api+'courses',
        url: function() {
            return this.urlRoot + '/' + this.id;
        }
    });
    return Model;
});
