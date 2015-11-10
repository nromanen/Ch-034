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

        beforeRender: function() {
            this.modules.fetch();
            this.insertView("#_modules", new ModulesModule.Views.Modules({collection: this.modules, imgUrl: this.model.get('image'), courseId: this.courseId}));
        },

        serialize: function() {
            var course = this.model;
            course.attributes.id = this.model.id;
            course.parseDate = this.convertToMonthAndDate;

            return {
                course: course,
            };
        }

    });

    return View;
});