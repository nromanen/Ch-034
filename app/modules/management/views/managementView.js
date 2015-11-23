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
        },

        serialize: function() {
            return {
                management: this.collection,
                name      : this.name,
                title     : this.title,
            };
        },

        url: function() {
            return this.api+"areas";
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

        deleteManagement: function() {
            console.log(this.collection);
        this.Model.destroy();
    },

    });

    return View;
});
