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
                name      : this.name,
                listPath  : this.listPath,
                editView  : !!this.editView
            };
        },

        initialize: function() {
            this.listenTo(this.collection, "sync request change", this.render, this);
            CMS.Event.on("model:created", function() {
                this.collection.fetch({reset: true});
            }, this);
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
                var _this = this;
                this.$el.find(".add-row").fadeToggle("slow");
                if (!(this.subView instanceof this.editView)) {
                    this.subView = new this.editView();
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