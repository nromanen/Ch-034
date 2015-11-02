define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),
        Vacancy = require("../model/vacancyModel"),

     Collection = CMS.Collection.extend({
        model: Vacancy,
        api: CMS.api,

        url: function() {
            return this.api+"vacancies?_limit=5&_order=DESC";
        },

        initialize: function(models, options) {
            
        }
    });

    return Collection;
});