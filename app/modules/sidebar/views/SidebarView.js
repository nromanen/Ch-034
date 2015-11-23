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

        },

        afterRender: function() {
            var _this = this;

            $.when(
                    this.areasCollection.fetch(),
                    this.groupsCollection.fetch(),
                    this.vacanciesCollection.fetch()
            ).done(function() {
                _this.removeView();
                _this.areaFilter = new FilterModule.Views.Filter({
                    collection: _this.areasCollection,
                    type: "Напрямок",
                    params: _this.areaParams
                });
                _this.groupFilter = new FilterModule.Views.Filter({
                    collection: _this.groupsCollection,
                    type: "Тип групи",
                    params: _this.groupParams
                });
                _this.vacanciesView = new VacanciesModule.Vacancies({
                    collection: _this.vacanciesCollection
                });

                _this.insertView("#filter", _this.areaFilter).render();
                _this.insertView("#filter", _this.groupFilter).render();
                _this.insertView("#vacancies", _this.vacanciesView).render();

            });
        }
    });
    return View;
});