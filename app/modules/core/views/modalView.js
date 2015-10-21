define(function(require) {
    "use strict";

    var CoreView = require("../view"),

    View = CoreView.extend({

        id: "applyModal",

        className: "modal fade",

        template: _.template(require("text!../templates/modalTemplate.html")),

        events:{
            "hidden.bs.modal #applyModal": "closePopup",
            "click .btn-apply": "submitHandlerClick",
            "click .btn-cancel": "declinePopup"

        },
        initialize: function(options) {
            if (!options.modalHeader) 
                this.modalHeader = "Я підтверджую подачу заявки на курс:";
            if (!options.submitButton) 
                this.submitButton = "Подати заявку";
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
        }

    });

    return View;
});
