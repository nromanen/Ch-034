define(function(require){
    "use strict";

    var CMS = require("CMS"),
        moment = require("moment"),

    Model = CMS.Model.extend({
        defaults: {
            id: null,
            isPublished: null,
            group: null,
            area: null,
            name: null,
            description: null,
            startDate: null,
            duration: null,
            endDate: null,
            schedule: null,
            minStudents: null,
            image: null,
            modules: []
        },

        parse: function(data, options) {
            this.startDate = moment(data.startDate);
            this.duration = data.duration;
            this.endDate = this.setEndDate();
            return data;
        },

        setEndDate: function() {
            return moment(this.startDate.add(this.duration * 7, 'days').toDate());
        },

        urlRoot: CMS.api+'courses',
        url: function() {
            return this.urlRoot + '/' + this.id;
        }
    });
    return Model;
});
