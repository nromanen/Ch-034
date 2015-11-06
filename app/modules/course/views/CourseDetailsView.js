define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        ModulesModule = require("modules/module/index"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/courseDetailsTemplate.html")),

        el: false,

        initialize: function() {
            this.modules = new ModulesModule.Collection([],{courseId: this.model.id});
            this.listenTo(this.model, "reset sync request", this.render);
        },

        beforeRender: function() {
            this.modules.fetch();
            this.insertView("#modules-container", new ModulesModule.Views.Modules({collection: this.modules, imgUrl: this.model.get('image')}));
        },

        serialize: function() {
            return {
                course: this.model,
                parseDate: this.convertToMonthAndDate
            };
        }

    });

    return View;
});