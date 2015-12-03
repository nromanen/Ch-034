define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        FilterModule = require("modules/filter/index"),
        VacanciesModule = require("modules/vacancies/index"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/sidebarTemplate.html")),
        el: false,
        events: {
            "click .clear-filter": "clearFilterHandler"
        },

        initialize: function() {
            CMS.Event.on("filter:change", this.showHideClearBtn, this);

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
        },
        afterRender: function() {
            if (this.$el.find(".filter-checkbox:checked").length) {
                this.showHideClearBtn(1);
            }
        },
        showHideClearBtn: function(length) {
            if (length > 0) {
                this.$el.find(".clear-filter").removeClass("hidden");
            } else {
                this.$el.find(".clear-filter").addClass("hidden");
            }
        },
        clearFilterHandler: function() {
            this.showHideClearBtn(0);
            this.$el.find(".filter-checkbox:checked").prop("checked", false);
            var path = CMS.router.getCurrentRootPath();
            CMS.router.navigate(path, {trigger: true});
        }
    });
    return View;
});