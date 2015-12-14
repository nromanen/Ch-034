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
            this.listenTo(this.model, "change", this.render, this);
        },
        serialize: function() {
            var course = this.model;
            course.attributes.id = this.model.id;
            course.parseDate = this.convertToMonthAndDate;
            return {
                course: course
            };
        },
        subscribeDialog: function(e){
            var _this = this;
            CMS.ModalView.prototype.submitHandlerClick = function(ev) {
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
                        _this.subscribeModal.showSuccessMesasage(data.message);
                    }
                });

            };

            this.subscribeModal.modalHeader = "Я підтверджую подачу заявки на курс:";
            this.subscribeModal.submitButton = "Подати заявку";
            this.subscribeModal.show();

        },
        unSubscribeDialog: function(ev){
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
                        data: {id: _this.model.id, name: this.model.get("name")},
                        success: function(data){
                            _this.subscribeModal.showSuccessMesasage(data.message);
                        }
                    });
            };
            this.subscribeModal.modalHeader = "Ви впевнені, що хочете відписатися від курсу :";
            this.subscribeModal.submitButton = "Відписатися";
            this.subscribeModal.show();
        }
    });
    return View;
});