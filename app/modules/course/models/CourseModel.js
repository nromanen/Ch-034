define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: "_id",
        defaults: {
            isPublished: null,
            group: null,
            area: null,
            name: null,
            description: null,
            startAt: null,
            endAt: null,
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
