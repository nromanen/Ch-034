define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/courseTemplate.html")),
        el: false,
        events: {
            'click .btn': "subscribeDialog"
        },
        initialize: function() {
            this.subscribeModal = new CMS.ModalView({model: this.model});
        },
        serialize: function() {
            var course = this.model;
            course.attributes.id = this.model.id;
            course.parseDate = this.convertToMonthAndDate;

            return {
                course: course
            };
        },
        subscribeDialog: function(ev){
            this.subscribeModal.render();
            this.subscribeModal.show();
        }
    });
    return View;
});