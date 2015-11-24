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
            this.listenTo(this.collection, "sync request change", this.render, this);
        },

        deleteManagement: function(ev) {
            console.log(this.model);
            this.model.destroy();
        },

        editManagement: function(ev) {
           console.log(ev.target.parentNode);
           ev.target.parentNode.previousSibling.previousSibling.lastChild.removeAttribute("disabled");
           ev.target.parentNode.previousSibling.previousSibling.lastChild.focus();
           ev.target.setAttribute("value","Зберегти");
           ev.target.setAttribute("class","btn btn-success");
           ev.target.setAttribute("id","saveManagementEdit");
           //$(evObj)[0].removeAttribute("disabled");
           //console.log(ev.target);
           //this.Model.destroy();
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
        },

    });

    return View;
});
