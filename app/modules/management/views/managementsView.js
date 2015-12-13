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
            this.$el.find("#managementlist>tr:not(.edit-row):even").addClass('zebra');
            this.$el.find("#" + this.name).addClass("active").find("a").addClass("active");
            if (this.type == "extended" || this.editView) {
                this.$el.find("#managementlist").prepend("<tr class='add-row'><td colspan='4'><div class='col-lg-12' id='collapsable-0'></div></td></tr>");
                this.$collapsable = $("#collapsable-0");
            }
        },

        renderOne: function(el){
            this.insertView("#managementlist", new ManagementView({
                model   : el,
                type    : this.type,
                name    : this.child,
                editView: this.editView,
                listPath: this.listPath
            }));
        },

        addManagement: function () {
            if(this.type == "extended" ) {
                this.$el.find(".add-row").fadeToggle("slow");
            }
            else {
                var managementName = _.escape(this.$el.find("#managementAddInput").val());
                if(!managementName) return;
                var management= new Model({name: managementName });
                management.url = this.collection.url();
                management.save();
                this.collection.fetch({reset:true});
            }
        }
     });

    return View;
});