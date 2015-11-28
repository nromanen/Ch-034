define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/courseTemplate.html")),
        el: false,
        events: {
            'click .btn-success': "subscribeDialog"
        },
        initialize: function() {
            this.subscribeModal = new CMS.ModalView({model: this.model});
        },
        serialize: function() {
            var course = this.model;
            course.attributes.id = this.model.id;
            course.parseDate = this.convertToMonthAndDate;
            return {
                course: course,
                courses: CMS.SessionModel.getItem("UserSession").profile._courses
            };
        },
        subscribeDialog: function(e){
            var _this = this;
            CMS.ModalView.prototype.submitHandlerClick = function() {
                $.ajax({
                    url: CMS.api + "courses/subscribe",
                    method: "POST",
                    data: {id: this.model.id, name: this.model.get("name")},
                    beforeSend: function(jqXHR){
                        jqXHR.setRequestHeader("x-access-token", CMS.SessionModel.getItem("UserSession").token);
                    },
                    success: function(data){
                        CMS.SessionModel.setItem("UserSession", JSON.stringify(data));
                        _this.subscribeModal.showSuccessMesasage(data.message);
                        _this.render();
                    }
                });
            };

            this.subscribeModal.render();
            this.subscribeModal.show();
        }
    });
    return View;
});