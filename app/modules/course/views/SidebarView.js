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
                type: "Area",
                params: areaParams
            });
            this.groupFilter = new this.filterView({
                collection: new FilterModule.Collection.Groups(),
                type: "Group",
                params: groupParams
            });
            this.vacancies = new VacanciesModule.Collection();
            this.vacancies.fetch().done(_.bind(function() {
                this.vacanciesView = new VacanciesModule.Views.Vacancies({collection: this.vacancies});
                this.insertView("#vacancies", this.vacanciesView.render());

            }, this));
            

            this.render();
        },

        el: false,

        beforeRender: function() {
            this.insertView("#filter", this.areaFilter);
            this.insertView("#filter", this.groupFilter);
            console.log(this.vacanciesView);
            
        }
        
    });

    return View;
});