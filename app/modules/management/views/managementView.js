define(function(require) {
    "use strict";
    var CMS = require("CMS"),
    Model = require("../models/managementModel"),
    View = CMS.View.extend({
        el: false,
        template: _.template(require("text!../templates/managementTemplate.html")),
        events: {
            "click #managementDel": "deleteManagementModal",
            "click #managementEdit": "editManagement",
            "click #saveManagementEdit": "saveEditManagement",
            "click #cenceleManagementEdit": "cenceleEdit",
        },

        serialize: function() {
            return {
                model: this.model,
            };
        },

        initialize: function() {
            this.listenTo(this.model, "reset change", this.render, this);
            CMS.ModalView.prototype.submitHandlerClick = function() {
                this.model.destroy();
                this.$el.modal("hide");
            };
            this.deleteModal = new CMS.ModalView({model: this.model, modalHeader: "Ви дійсно хочете видалити :", submitButton: "Видалити"});
        },

        deleteManagementModal: function(ev) {
            this.deleteModal.render();
            this.deleteModal.show();
        },

        editManagement: function(ev) {
            var evModelEl = ev.target.parentNode;
            evModelEl.previousSibling.previousSibling.lastChild.removeAttribute("disabled");
            evModelEl.previousSibling.previousSibling.lastChild.focus();
            $(evModelEl.parentNode).find(".managementEdit").attr({"value":"Зберегти", "class":"btn btn-success", "id":"saveManagementEdit"});
            $(evModelEl.parentNode).find("#managementDel").attr({"value":"Відмінити", "class":"btn btn-warning", "id":"cenceleManagementEdit"});
        },

        saveEditManagement: function(ev) {
           var newValue = _.escape($(ev.target.parentNode.parentNode).find("#managementName").val());
           ev.target.parentNode.previousSibling.previousSibling.lastChild.setAttribute("disabled","disabled");
            $(ev.target.parentNode.parentNode).find(".managementEdit").attr({"value":"Редагувати", "class":"btn btn-primary", "id":"managementEdit"});
           this.model.set({name:newValue});
           this.model.save();
           this.model.fetch({reset:true});
        },

        cenceleEdit: function(ev) {
            $(ev.target.parentNode.parentNode).find("#managementName").val(this.model.get("name"));
            this.saveEditManagement(ev);
        },

    });

    return View;
});
