define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        ModulesModule = require("modules/module/index"),
    View = CMS.View.extend({
        template: _.template(require("text!../templates/courseDetailsTemplate.html")),
        el: false,
        initialize: function(options) {
            this.courseId = options.courseId;
            this.model.get("endDate");
            this.modules = new ModulesModule.Collection([],{courseId: this.model.id});
            this.listenTo(this.model, "reset sync request", this.render);
        },
        beforeRender: function() {
            this.modules.fetch();
            this.insertView("#modules-container", new ModulesModule.Views.Modules({collection: this.modules, imgUrl: this.model.get('image'), courseId: this.courseId}));
        },
        serialize: function() {
            return {
                course: this.model,
                parseDate: this.convertToMonthAndDate,
                courseId : this.courseId
            };
        }
    });
    return View;
});