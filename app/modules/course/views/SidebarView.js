define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        FilterModule = require("modules/filter/index"),
        VacanciesModule = require("modules/vacancies/index"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/sidebarTemplate.html")),

        initialize: function() {
            var areaParams, groupParams;

            areaParams = this.filterParams.area ? [].concat(this.filterParams.area) : [];
            groupParams = this.filterParams.group ? [].concat(this.filterParams.group) : [];

            this.filterView = FilterModule.Views.Filter;
            this.areaFilter = new this.filterView({
                collection: new FilterModule.Collection.Areas(),
                type: "Напрямок",
                params: areaParams
            });
            this.groupFilter = new this.filterView({
                collection: new FilterModule.Collection.Groups(),

                type: "Тип групи",
                params: groupParams
            });

            this.vacanciesView = new VacanciesModule.Views.Vacancies({collection: new VacanciesModule.Collection()});

            this.render();
        },

        el: false,

        beforeRender: function(collection) {
            this.insertView("#filter", this.areaFilter);
            this.insertView("#filter", this.groupFilter);
            this.insertView("#vacancies", this.vacanciesView);

        }

    });

    return View;
});