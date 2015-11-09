define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        Course = require("../models/CourseModel"),

    Collection = CMS.PageableCollection.extend({

        model: Course,
        currentPage: 1,
        api: CMS.api,
        perPage: CMS.perPage,
        paginationSize: CMS.paginationSize,
        hrefPath: "#courses/page/",
        resource: "courses",

        initialize: function() {
            CMS.Event.on("filter:change", _.bind(function(){
                this.setPageOffset(1);
            }, this));
        },
        setFilterQueries: function(parsedParams, queryParams) {
            this.queryParams = queryParams;
            this.filterParams = parsedParams;
        },
        isFiltered: function() {
            return (!_.isEmpty(this.filterParams)) ? true : false;
        },
        getResource: function() {
            return this.isFiltered() ? this.resource+"/filter" : this.resource;
        },
        getPageUrl: function() {
            if (this.isFiltered()) {
                return CMS.PageableCollection.prototype.getPageUrl.apply(this, arguments) + "?"+this.queryParams;
            } else {
                return CMS.PageableCollection.prototype.getPageUrl.apply(this, arguments);
            }
        },
        url: function() {
            var string = "";

            _.forEach(this.filterParams, function(array, name) {
                _.forEach(array, function(val) {
                    string += name + "=" + val + "&";
                });
            });

            string = string.slice(0, -1);
            return CMS.PageableCollection.prototype.getApiUrl.apply(this, arguments) + "&"+string;
        }
    });
    return Collection;
});