define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        ManagementView = require("./managementView"),
        Model = require("../models/managementModel"),
    View = CMS.View.extend({
        //el: "#CrsMSContainer",
        template: _.template(require("text!../templates/managementsTemplate.html")),

        events: {
            "click #managementAddButton": "addManagement",
        },

        serialize: function() {
            return {
                management: this.collection,
                name      : this.name,
                title     : this.title,
            };
        },

        initialize: function() {
            this.listenTo(this.collection, "sync request change", this.render, this);
        },

        beforeRender: function(){
            console.log(this.collection);
            console.log(this);
            this.collection.each(this.renderOne, this);
        },

        renderOne: function(el){
            console.log(el);
            this.insertView("#managementlist", new ManagementView({
                model: el
            }));
        },

        addManagement: function () {
            var managementName = this.$el.find("#managementAddInput").val();
            console.log(managementName);
            var management= new Model({name: managementName });
            management.url = this.collection.url();
            this.collection.add(management);
            management.save();

            console.log(this.collection);
        }


     });

    return View;
});
