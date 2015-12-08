define(function(require) {
    "use strict";
    var CMS = require("CMS"),
    Model = require("../models/managementModel"),
    View = CMS.View.extend({
        el: false,
        template    : _.template(require("text!../templates/managementTemplate.html")),
        events: {
            "click .managementDel": "deleteManagementModal",
            "click .managementEdit": "editManagement",
            "click .saveManagementEdit": "saveEditManagement",
            "click .cenceleManagementEdit": "canceleEdit",
        },

        serialize: function() {
            return {
                model: this.model,
                name : this.name,
                child: this.child
            };
        },

        initialize: function() {
            this.listenTo(this.model, "reset change", this.render, this);
            CMS.ModalView.prototype.submitHandlerClick = function() {
                this.model.destroy();
                this.$el.modal("hide");
            };
            this.deleteModal = new CMS.ModalView({model: this.model, modalHeader: "Ви дійсно хочете видалити :", submitButton: "Видалити"});
            switch (this.kind) {
                case "questions":
                    this.editTemplate = _.template(require("text!../templates/editQuestionsFormTemplate.html"));
                    break;
            }
        },

        afterRender: function(){

        },

        deleteManagementModal: function(ev) {
            this.deleteModal.render();
            this.deleteModal.show();
        },

        editManagement: function(ev){
            var evModelEl = ev.target.parentNode;
            if(["questions"].indexOf(this.kind) != -1) {
                this.$el.after(this.editTemplate(this.model.toJSON()));
            }
            else {
                var inputEdit = evModelEl.previousSibling.previousSibling;
                if (["tests", "modules"].indexOf(this.kind) != -1) {
                    inputEdit = inputEdit.previousSibling.previousSibling.lastChild; console.log(inputEdit);
                }
                else {
                    inputEdit = inputEdit.lastChild;
                }
                inputEdit.removeAttribute("disabled");
                inputEdit.focus();
            }
            $(evModelEl.parentNode).find(".managementEdit").attr({"title":"Зберегти", "class":"saveManagementEdit glyphicon glyphicon-ok"});
            $(evModelEl.parentNode).find(".managementDel").attr({"title":"Відмінити", "class":"cenceleManagementEdit glyphicon glyphicon-remove"});
        },

        saveEditManagement: function(ev) {
           var newValue = _.escape($(ev.target.parentNode.parentNode).find(".managementVal").val());
           if (!newValue) return;
           ev.target.parentNode.previousSibling.previousSibling.lastChild.setAttribute("disabled","disabled");
            $(ev.target.parentNode.parentNode).find(".managementEdit").attr({"title":"Редагувати", "class":"glyphicon glyphicon-pencil"});
           this.model.set({name:newValue});
           this.model.save();
           this.model.fetch({reset:true});
        },

        canceleEdit: function(ev) {
            $(ev.target.parentNode.parentNode).find(".managementVal").val(this.model.get("name"));
            this.saveEditManagement(ev);
        },

    });

    return View;
});
