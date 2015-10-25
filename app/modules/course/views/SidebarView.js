define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        FilterModule = require("modules/filter/index"),
    
    View = CMS.View.extend({
        template: _.template(require("text!../templates/sidebarTemplate.html")),

        initialize: function() {
            this.filterView = FilterModule.Views.Filter;
            this.areaFilter = new this.filterView({collection: new FilterModule.Collection.Areas(), type: "Area" });
            this.groupFilter = new this.filterView({collection: new FilterModule.Collection.Groups(), type: "Group"});
            this.render();
        },

        el: false,

        beforeRender: function() {
            this.insertView("#filter", this.areaFilter);
            this.insertView("#filter", this.groupFilter);
        }
        
    });

    return View;
});