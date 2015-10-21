define(function(require) {
    "use strict";

    var CoreView = require("../view"),

    View = CoreView.extend({
    	className:"modal fade",
        id: "applyModal",

        template: _.template(require("text!../templates/modalTemplate.html")),

        events:{
        	"hidden.bs.modal #applyModal": "closePopup",
        	"click .btn-apply": "submitHandlerClick",
        	"click .btn-cancel": "declinePopup"

        },

        render: function(){
        	this.$el.html(this.template(this.model.toJSON()));
        	this.$el.modal({show:false});
        },
        show: function(){
        	this.$el.modal(show);
        },
        closePopup: function(){
        	this.remove();
        },
        submitHandlerClick: function(){

        },
        declinePopup: function(){
        	this.$el.modal(hide);
        }

    });

    return View;
});


//var modal = new CMS.ModalView({model: this.model, id: "#subscribe"}).render();
//modal.show
