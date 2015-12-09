define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        ManagementView = require("./managementView"),
        Model = require("../models/managementModel"),
    View = CMS.View.extend({
        template: _.template(require("text!../templates/managementsTemplate.html")),
        events: {
            "click #managementAddButton": "addManagement",
        },

        serialize: function() {
            return {
                collection: this.collection,
                name      : this.name
            };
        },

        initialize: function() {
            this.listenTo(this.collection, "sync request change", this.render, this);
        },

        beforeRender: function(){
            this.collection.each(this.renderOne, this);
        },

        afterRender: function(){
            this.$el.find("#" + this.name).addClass("active").find("a").addClass("active");
        },

        renderOne: function(el){
            this.insertView("#managementlist", new ManagementView({
                model: el,
                type: this.type,
                editView: this.editView,
                listPath: this.listPath
            }));
        },

        addManagement: function () {
            var managementName = _.escape(this.$el.find("#managementAddInput").val());
            if(!managementName) return;
            var management= new Model({name: managementName });
            management.url = this.collection.url();
            management.save();
            this.collection.fetch({reset:true});
        }
     });

    return View;
});
