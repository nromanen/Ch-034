define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        ModulesModule = require("modules/module/index"),
    View = CMS.View.extend({
        template: _.template(require("text!../templates/courseDetailsTemplate.html")),
        el: false,
        initialize: function(options) {
            this.courseId = options.courseId;
            this.modules = new ModulesModule.Collection([],{courseId: this.model.id});
            this.listenTo(this.model, "reset sync request", this.render);
        },
        afterRender: function() {
            this.modules.fetch().done($.proxy(function() {
                this.setView("#modules-container", new ModulesModule.Views.Modules({collection: this.modules, imgUrl: this.model.get('image'), subscribed: this.model.get('subscribed'), courseId: this.courseId}));
                this.renderViews();
            }, this));

            $("body,html").animate({"scrollTop": window.localStorage.getItem("scrollModuleList")}, "slow");
            window.localStorage.setItem("scrollModuleList", 0);
        },
        serialize: function() {
            var course = this.model;
            course.attributes.id = this.model.id;
            course.parseDate = this.convertToMonthAndDate;

            return {
                course: course
            };
        }
    });
    return View;
});