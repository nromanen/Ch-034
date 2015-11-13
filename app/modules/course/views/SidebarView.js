define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        FilterModule = require("modules/filter/index"),
        VacanciesModule = require("modules/vacancies/index"),
        WigetModule = require("modules/widget/index"),

        testWidget = {
                name: "newName",
                HTML: "<p>boady</p>"
            },

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

            this.vacanciesView = new VacanciesModule.Vacancies({collection: new VacanciesModule.Collection()});
            this.widgetView = new WigetModule.View({model: {name: "newName", HTML: this.vacanciesView.el} })

     //       this.render();
        },
        el: false,
        beforeRender: function(collection) {
            console.log(this.vacanciesView.$el.prop('outerHTML'));
            this.insertView("#filter", this.areaFilter);
            this.insertView("#filter", this.groupFilter);
            //this.insertView("#vacancies", this.vacanciesView);
            this.insertView("#vacancies", this.widgetView);


        }
    });
    return View;
});