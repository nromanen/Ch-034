define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/resourceTemplate.html")),
        el: false,
        initialize: function(options) {
            this.model.set("moduleId", options.moduleId);
            this.listenTo(this.model, "reset sync request", this.render);
        },

        serialize: function() {
            var resource = this.model;
            resource.attributes.moduleId = this.model.moduleId;
            return {
                resource: resource
            };
        },

        events: {
            "click #editResource": "editResource",
            "click #deleteResource": "deleteResource"
        },

        editResource: function() {

        },

        deleteResource: function() {
            var Modal = new CMS.ModalView({
                modalHeader  : "Ви впевнені, що хочете видалити ресурс?",
                submitButton : "Так"
            });
            var that = this;
            CMS.ModalView.prototype.submitHandlerClick = function(e) {
                e.preventDefault();
                that.model.destroy();
                this.declinePopup();
            };
            this.listenTo(this.collection, "reset sync request", this.render);
            Modal.render();
            Modal.show();
        }
    });
    return View;
});