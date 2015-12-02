define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        FilterModule = require("modules/filter/index"),
        VacanciesModule = require("modules/vacancies/index"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/sidebarTemplate.html")),
        el: false,

        initialize: function() {
            this.areaParams = this.filterParams.area ? [].concat(this.filterParams.area) : [];
            this.groupParams = this.filterParams.group ? [].concat(this.filterParams.group) : [];

            this.areasCollection = new FilterModule.Collection.Areas();
            this.groupsCollection = new FilterModule.Collection.Groups();
            this.vacanciesCollection = new VacanciesModule.Collection();

            this.areasCollection.fetch();
            this.groupsCollection.fetch();
            this.vacanciesCollection.fetch();
        },

        beforeRender: function() {
            this.areaFilter = new FilterModule.Views.Filter({
                collection: this.areasCollection,
                type: "Напрямок",
                params: this.areaParams
            });
            this.groupFilter = new FilterModule.Views.Filter({
                collection: this.groupsCollection,
                type: "Тип групи",
                params: this.groupParams
            });
            this.vacanciesView = new VacanciesModule.Vacancies({
                collection: this.vacanciesCollection
            });
            this.insertView("#filter", this.areaFilter);
            this.insertView("#filter", this.groupFilter);
            this.insertView("#vacancies", this.vacanciesView);
        }
    });
    return View;
});