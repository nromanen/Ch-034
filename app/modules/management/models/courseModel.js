define(function(require){
    "use strict";

    var CMS = require("CMS"),

    Model = CMS.Model.extend({
        idAttribute: "_id",
        defaults: {
            isPublished: false,
            groups: [],
            area: "",
            name: "",
            publish_at: null,
            unpublish_at: null,
            description: "",
            startDate: null,
            duration: 0,
            schedule: [],
            minStudents: 0,
            image: "",
            modules: []
        },

        urlRoot: CMS.api+'courses',

    });
    return Model;
});
