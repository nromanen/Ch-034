define(function(require){
    "use strict";

    var CMS = require("CMS"),
        moment = require("moment"),

    Model = CMS.Model.extend({
        idAttribute: "_id",
        defaults: {
            isPublished: null,
            group: null,
            area: null,
            name: null,
            description: null,
            startDate: null,
            duration: null,
            schedule: null,
            minStudents: null,
            image: null,
            modules: []
        },

        ajaxMethod : {
            DELETE : "DELETE",
            POST   : "POST"
        },

        parse: function(data, options) {
            this.startDate = moment(data.startDate.toString());
            this.duration = data.duration;
            this.attributes.endDate = this.setEndDate();
            return data;
        },

        setEndDate: function() {
            return moment(this.startDate.add(this.duration * 7, 'days').toDate());
        },

        urlRoot: CMS.api+'courses',

    });
    return Model;
});
