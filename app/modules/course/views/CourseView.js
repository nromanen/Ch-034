define(function(require) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/courseTemplate.html")),
        el: false,
        events: {
            'click .btn-success': "subscribeDialog",
            'click .btn-unsubscribe': 'unSubscribeDialog',
        },
        initialize: function() {
            this.subscribeModal = new CMS.ModalView({model: this.model});
            this.subscribeUrl = CMS.api + "courses/subscribe";
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
                $.ajaxSetup({
                    beforeSend: function(jqXHR){
                        jqXHR.setRequestHeader("x-access-token", CMS.SessionModel.getItem("UserSession").token);
                    },
                });
                $.ajax({
                    url: _this.subscribeUrl,
                    method: this.model.ajaxMethod.POST,
                    data: {id: this.model.id, name: this.model.get("name")},
                    success: function(data){
                        CMS.SessionModel.setItem("UserSession", JSON.stringify(data));
                        _this.subscribeModal.showSuccessMesasage(data.message);
                        _this.render();
                    }
                });
            };
            this.subscribeModal.modalHeader = "Я підтверджую подачу заявки на курс:";
            this.subscribeModal.submitButton = "Подати заявку";
            this.subscribeModal.render();
            this.subscribeModal.show();
        },
        unSubscribeDialog: function(e){
            var _this = this;
            CMS.ModalView.prototype.submitHandlerClick = function() {
            $.ajaxSetup({
                beforeSend: function(jqXHR){
                    jqXHR.setRequestHeader("x-access-token", CMS.SessionModel.getItem("UserSession").token);
                },
            });
            $.ajax({
                    url: _this.subscribeUrl,
                    method: this.model.ajaxMethod.DELETE,
                    data: {id: this.model.id, name: this.model.get("name")},
                    success: function(data){
                        CMS.SessionModel.setItem("UserSession", JSON.stringify(data));
                        _this.subscribeModal.showSuccessMesasage(data.message);
                        _this.render();
                    }
                });
            };
            this.subscribeModal.modalHeader = "Ви впевнені, що хочете відписатися від курсу :";
            this.subscribeModal.submitButton = "Відписатися";
            this.subscribeModal.render();
            this.subscribeModal.show();
        }
    });
    return View;
});