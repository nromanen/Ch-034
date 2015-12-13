define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/resourceTemplate.html")),
        el: false,

        initialize: function(options) {
            this.moduleId = options.moduleId;
            this.listenTo(this.model, "invalid", this.errorMessage);
            this.listenTo(this.model, "reset sync request", this.render);
            $.ajaxSetup({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("x-access-token", CMS.SessionModel.getItem('UserSession').token);
                }
            });
        },

        serialize: function() {
            var resource = this.model;
            resource.attributes.moduleId = this.moduleId;
            return {
                resource: resource
            };
        },

        events: {
            "click #editResource": "editResource",
            "click #deleteResource": "deleteResource",
            "click #saveResourceEdit": "saveEditResource",
            "click #cancelResourceEdit": "cancelEditResource",
        },

        editResource: function() {
            this.$el.find('#resourceName').prop("disabled", false);
            this.$el.find('#resourceName').focus();
            this.$el.find('#editResource').attr({
                "title":"Зберегти",
                "class":"glyphicon glyphicon-ok",
                "id":"saveResourceEdit"
            });
            this.$el.find('#deleteResource').attr({
                "title":"Відмінити",
                "class":"glyphicon glyphicon-remove",
                "id":"cancelResourceEdit"
            });
        },

        saveEditResource: function(ev) {
            this.$el.find('#resourceName').removeClass("error");
            this.$el.find('#resourceName').popover("destroy");
            var newValue = _.escape(this.$el.find('#resourceName').val());
            this.model.set({name:newValue, moduleId: this.moduleId});
            if(!this.model.isValid()) return;
            this.model.save();
            this.$el.find('#resourceName').html(this.model.get("name"));
            this.model.fetch({reset: true});
            this.changeGlyphicons();
        },

        cancelEditResource: function(ev) {
            this.$el.find('#resourceName').val(this.model.get("name"));
            this.$el.find('#resourceName').prop("disabled", true);
            this.changeGlyphicons();
        },

        changeGlyphicons: function() {
            this.$el.find('#saveResourceEdit').attr({
                "title":"Редагувати",
                "class":"glyphicon glyphicon-pencil",
                "id":"editResource"
            });
            this.$el.find('#cancelResourceEdit').attr({
                "title":"Видалити",
                "class":"glyphicon glyphicon-trash",
                "id":"deleteResource"
            });
        },

        deleteResource: function() {
            var Modal = new CMS.ModalView({
                modalHeader  : "Ви впевнені, що хочете видалити ресурс?",
                submitButton : "Видалити"
            });
            var _this = this;
            CMS.ModalView.prototype.submitHandlerClick = function(e) {
                e.preventDefault();
                _this.model.destroy();
                this.declinePopup();
            };
            this.listenTo(this.collection, "reset sync request", this.render);
            Modal.render();
            Modal.show();
        },

        errorMessage: function (model, errors) {
            this.$el.find('#resourceName').addClass("error");
            this.$el.find('#resourceName').popover({
                container: "body",
                name: errors[0].title,
                content: errors[0].message,
                placement: "right",
                trigger: "focus, hover"
            });
            this.$el.find('#resourceName').popover("toggle");
        },
    });
    return View;
});