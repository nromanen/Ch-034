define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    Model = require("../models/managementModel"),
    View = CMS.View.extend({
        el: false,
        template: _.template(require("text!../templates/managementTemplate.html")),

        events: {
            "click #managementDel": "deleteManagement",
            "click #managementEdit": "editManagement",
            "click #saveManagementEdit": "saveEditManagement",
        },

        serialize: function() {
            console.log(this.model);
            return {
                model: this.model,
            };
        },

        initialize: function() {
            this.listenTo(this.model, "reset change", this.render, this);
        },

        deleteManagement: function(ev) {
            console.log(this.model);
            this.model.destroy();
        },

        editManagement: function(ev) {
           console.log(ev.target.parentNode);
           ev.target.parentNode.previousSibling.previousSibling.lastChild.removeAttribute("disabled");
           ev.target.parentNode.previousSibling.previousSibling.lastChild.focus();
           $(ev.target.parentNode.parentNode).find(".managementEdit").attr({"value":"Зберегти", "class":"btn btn-success", "id":"saveManagementEdit"});

        },

        saveEditManagement: function(ev) {
           var newValue = ev.target.parentNode.previousSibling.previousSibling.lastChild.value;
           ev.target.parentNode.previousSibling.previousSibling.lastChild.setAttribute("disabled","disabled");
           console.log(newValue);
           ev.target.setAttribute("value","Редагувати");
           ev.target.setAttribute("class","btn btn-primary");
           ev.target.setAttribute("id","managementEdit");
           console.log(this.model);
           this.model.set({name:newValue});
           this.model.save();
           console.log(this.model);
           this.model.fetch({reset:true});
        },

    });

    return View;
});
