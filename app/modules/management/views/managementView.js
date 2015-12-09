define(function(require) {
    "use strict";
    var CMS = require("CMS"),
    Model = require("../models/managementModel"),
    View = CMS.View.extend({
        el: false,
        template    : _.template(require("text!../templates/managementTemplate.html")),
        events: {
            "click #managementDel": "deleteManagementModal",
            "click #managementEdit": "editManagement",
            "click #saveManagementEdit": "saveEditManagement",
            "click #cenceleManagementEdit": "canceleEdit",
        },

        serialize: function() {
            return {
                model: this.model,
                name: this.name,
                listPath: this.listPath,
                type: this.type
            };
        },

        initialize: function() {
            //this.listenTo(this.model, "reset change", this.render, this);
            CMS.ModalView.prototype.submitHandlerClick = function() {
                this.model.destroy();
                this.$el.modal("hide");
            };
            this.deleteModal = new CMS.ModalView({
                model: this.model,
                modalHeader: "Ви дійсно хочете видалити :",
                submitButton: "Видалити"
            });
            if (this.listPath) {
                var pathParams = this.listPath.match(CMS.Helpers.RegexPatterns.paramsRegex);
                if (!_.isEmpty(pathParams)) {
                    this.listPath = this.listPath.replace(pathParams[0], this.model.id);
                }
            }

        },
        afterRender: function() {
            this.$inputSelector = this.$el.find('.managementVal');
            this.$editButton = this.$el.find("#managementEdit");
            this.$delButton = this.$el.find("#managementDel");
            if (this.type === "extended" || this.editView) {
                var rows = this.$el.find("td").length;
                this.$el.after("<tr class='edit-row'><td colspan="+rows+"><div class='col-lg-12' id='collapsable-"+this.model.id+"'></div></td></tr>");
                this.$collapsable = $("#collapsable-"+this.model.id);
            }
        },

        deleteManagementModal: function(ev) {
            this.deleteModal.render();
            this.deleteModal.show();
        },

        editManagement: function(ev) {
            var _this = this;
            switch (this.type) {
                case "extended":
                    this.$el.next().fadeToggle("slow");
                    if (!(this.subView instanceof this.editView)) {
                        this.subView = new this.editView({model: this.model});
                        this.subView.render().then(function(view){
                            _this.$collapsable.html(view.el);

                            $("#discard").on("click", function(e) {
                                _this.$el.next().fadeToggle("slow", function() {
                                    _this.subView.remove();
                                    delete _this.subView;
                                });

                            });
                        });
                    }
                    break;

                case "list":
                    this.$inputSelector
                        .prop("disabled", function(_, prop) {return !prop;})
                        .focus();

                    this.$editButton.attr({
                        "title":"Зберегти",
                        "class":"glyphicon glyphicon-ok",
                        "id":"saveManagementEdit"
                    });
                    this.$delButton.attr({
                        "title":"Відмінити",
                        "class":"glyphicon glyphicon-remove",
                        "id":"cenceleManagementEdit"
                    });
                    break;
            }

        },

        saveEditManagement: function(ev) {
            var newValue = _.escape(this.$inputSelector.val());
            if (!newValue) return;
            this.$inputSelector.prop("disabled","disabled");
            this.$editButton.attr({
                "title":"Редагувати",
                "class":"glyphicon glyphicon-pencil",
                "id":"managementEdit"
            });
            this.model.set({name:newValue});
            this.model.save();
            this.model.fetch({reset:true});
        },

        canceleEdit: function(ev) {
            this.$inputSelector.val(this.model.get("name"));
            this.saveEditManagement(ev);
        },

    });

    return View;
});
