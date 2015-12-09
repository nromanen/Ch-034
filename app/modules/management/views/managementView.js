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
            "click .cancelManagementEdit": "cancelEdit",
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
                case "modules":
                    this.addEditModuleTemplate = _.template(require("text!../templates/addEditModuleTemplate.html"));
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
                    inputEdit = inputEdit.previousSibling.previousSibling.lastChild;
                }
                else {
                    inputEdit = inputEdit.lastChild;
                }
                inputEdit.removeAttribute("disabled");
                inputEdit.focus();
            }
            $(evModelEl.parentNode).find(".managementEdit").attr({"title":"Зберегти", "class":"saveManagementEdit glyphicon glyphicon-ok"});
            $(evModelEl.parentNode).find(".managementDel").attr({"title":"Відмінити", "class":"cancelManagementEdit glyphicon glyphicon-remove"});
            if (this.kind == "modules") {
                this.$el.after(this.addEditModuleTemplate(this.model.toJSON()));
                $(document).ready(function() {
                _.delay(function() {
                    var editor = $("#moduleDescription").ckeditor({
                            extraPlugins: 'justify,image,uploadimage',
                            imageUploadUrl: CMS.api+"upload/image",
                            language: 'uk',
                            skin:'moono'
                        }).editor;
                    if (editor !== "undefined") {
                        editor.on('fileUploadRequest', function( evt ) {
                                var xhr = evt.data.fileLoader.xhr;
                                xhr.setRequestHeader( 'ContentType', "form/multi-part");
                                xhr.setRequestHeader( 'x-access-token', CMS.SessionModel.getItem('UserSession').token );
                                xhr.setRequestHeader( 'Cache-Control', 'no-cache' );
                            } );
                        }
                    }, 300);
                });
                $("module-name").focus();
                    $("#module-name").val(this.model.attributes.name);
                    $("#description").val(this.model.attributes.description);
                    document.getElementById("test-available").checked = this.model.attributes.available;
            } else {
                $(evModelEl.parentNode.parentNode).find(".cenceleManagementEdit").click();
                if (this.kind == "areas"|| this.kind == "groups"){
                    evModelEl.previousSibling.previousSibling.lastChild.removeAttribute("disabled");
                    evModelEl.previousSibling.previousSibling.lastChild.focus();
                }
                $(evModelEl.parentNode).find(".managementEdit").attr({"title":"Зберегти", "class":"glyphicon glyphicon-ok saveManagementEdit"});
                $(evModelEl.parentNode).find(".managementDel").attr({"title":"Відмінити", "class":"glyphicon glyphicon-remove cenceleManagementEdit"});
                $(evModelEl.parentNode).find(".editForm").fadeIn();
            }
        },

        saveEditManagement: function(ev) {
           var newValue = _.escape($(ev.target.parentNode.parentNode).find(".managementVal").val());
           if (!newValue) return;
           ev.target.parentNode.previousSibling.previousSibling.lastChild.setAttribute("disabled","disabled");
            $(ev.target.parentNode.parentNode).find(".managementEdit").attr({"title":"Редагувати", "class":"glyphicon glyphicon-pencil"});
           this.model.set({name:newValue});
           if (this.kind == "modules") {
                this.model.set({
                    description: $("#moduleDescription").val(),
                    available: $("#test-available").prop("checked")
                });
           }
           this.model.save();
           this.model.fetch({reset:true});
        },

        cancelEdit: function(ev) {
            $(ev.target.parentNode.parentNode).find(".managementVal").val(this.model.get("name"));
            this.saveEditManagement(ev);
        }
    });

    return View;
});