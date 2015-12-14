define(function(require) {
    "use strict";

    var CoreView = require("../view"),

    View = CoreView.extend({
        template: _.template(require("text!../templates/modalTemplate.html")),
        id: "applyModal",
        className: "modal fade",
        events:{
            "hidden.bs.modal": "closePopup",
            "click #modalOkBtn": "submitHandlerClick",
            "click #accept": "acceptHanlderClick",
            "click .btn-cancel": "declinePopup"
        },
        initialize: function(options) {
            if (!options.modalHeader)
                this.modalHeader = "Я підтверджую подачу заявки на курс:";
            if (!options.submitButton)
                this.submitButton = "Подати заявку";
            this.successTemplate = _.template(require("text!../templates/modalSuccessTemplate.html"));
        },
        serialize: function() {
            return {
                model: this.model,
                modalHeader: this.modalHeader,
                submitButton: this.submitButton,
            };
        },
        afterRender: function() {
            this.$el.modal({show:false});
        },
        show: function(){
            this.render();
            this.$el.modal("show");
        },
        closePopup: function(){
            this.$el.removeData();
            this.remove();
        },
        submitHandlerClick: function(ev){
        },
        acceptHanlderClick: function(ev) {
            this.model.fetch({reset: true});
        },
        declinePopup: function(){
            this.$el.modal("hide");
        },
        showSuccessMesasage: function(mess){
            var _this = this;
            setTimeout(function() {
                _this.$el.find(".modal-dialog").html(_this.successTemplate({successMessage: mess }));
                return this;
            }, 200);
        }

    });
    return View;
});
