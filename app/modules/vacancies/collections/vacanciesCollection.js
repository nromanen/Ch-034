define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),
        Vacancy = require("../models/vacancyModel"),

     Collection = CMS.Collection.extend({
        model: Vacancy,
        api: CMS.api,
        url: function() {
            return this.api+"vacancies?_limit=5&_sort=id&_order=DESC";
        }
    });

    return Collection;
});