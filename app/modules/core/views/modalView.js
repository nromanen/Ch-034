define(function(require) {
    "use strict";

    var CoreView = require("../view"),

    View = CoreView.extend({
        template: _.template(require("text!../templates/modalTemplate.html")),
        id: "applyModal",
        className: "modal fade",
        events:{
            "hidden.bs.modal #applyModal": "closePopup",
            "click .btn-success": "submitHandlerClick",
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
            this.$el.modal("show");
        },
        closePopup: function(){
            this.remove();
        },
        submitHandlerClick: function(){
        },
        declinePopup: function(){
            this.$el.modal("hide");
        },
        showSuccessMesasage: function(mess){
            $(".modal-dialog").html(this.successTemplate({successMessage: mess }));
            return this;
        }

    });
    return View;
});
