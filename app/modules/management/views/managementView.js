define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    Model = require("../models/managementModel"),
    View = CMS.View.extend({
        //el: "#CrsMSContainer",
        template: _.template(require("text!../templates/managementTemplate.html")),

        events: {
            "click #managementAddButton": "addManagement",
            "click #managementDel": "deleteManagement",
            "click #managementEdit": "editManagement",
            "click #saveManagementEdit": "saveEditManagement",
        },

        serialize: function() {
            return {
                management: this.collection,
                name      : this.name,
                title     : this.title,
            };
        },

        initialize: function() {
            this.listenTo(this.collection, "sync request change", this.render);
        },

       addManagement: function () {
            var managementName = this.$el.find("#managementAddInput").val();
            console.log(managementName);
            var management= new Model({name: managementName });
            this.collection.create(management);
            console.log(this.collection);
       },

        deleteManagement: function(ev) {
            console.log(ev.target.closest("tr").remove());
            console.log(this.collection);
            this.Model.destroy();
        },

        editManagement: function(ev) {
           ev.target.closest("td").previousSibling.previousSibling.lastChild.removeAttribute("disabled");
           ev.target.closest("td").previousSibling.previousSibling.lastChild.focus();
           ev.target.setAttribute("value","Зберегти");
           ev.target.setAttribute("class","btn btn-success");
           ev.target.setAttribute("id","saveManagementEdit");
           //$(evObj)[0].removeAttribute("disabled");
            console.log(ev.target);
            //this.Model.destroy();
        },

        saveEditManagement: function(ev) {
            var newValue = ev.target.closest("td").previousSibling.previousSibling.lastChild.value;
           ev.target.closest("td").previousSibling.previousSibling.lastChild.setAttribute("disabled","disabled");
           console.log(newValue);
           ev.target.setAttribute("value","Редагувати");
           ev.target.setAttribute("class","btn btn-primary");
           ev.target.setAttribute("id","managementEdit");
           //$(evObj)[0].removeAttribute("disabled");
            console.log(ev.target);
            //this.Model.destroy();
        },

    });

    return View;
});
