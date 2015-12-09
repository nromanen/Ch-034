define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        ManagementView = require("./managementView"),
        Model = require("../models/managementModel"),
    View = CMS.View.extend({
        template: _.template(require("text!../templates/managementsTemplate.html")),
        events: {
            "click #managementAddButton": "addManagement",
            "click #saveModule": "saveModule",
            "click #cancelModule": "cancelModule"
        },

        serialize: function() {
            return {
                management: this.collection,
                name      : this.name,
                title     : this.title,
                idParent  : this.id
            };
        },

        initialize: function() {
            this.listenTo(this.collection, "sync request change", this.render, this);
            switch (this.name) {
                case "modules":
                    this.addEditModuleTemplate = _.template(require("text!../templates/addEditModuleTemplate.html"));
                    this.ModulesModule = require("../../module/index");
                    break;
            }
        },

        beforeRender: function(){
            this.collection.each(this.renderOne, this);
        },

        afterRender: function(){
            this.$el.find("#" + this.name).addClass("active").find("a").addClass("active");
        },

        renderOne: function(el){
            switch (this.name) {
                case "courses":
                    this.child = {
                        name     : "модулі",
                        hrefPart : "modules"
                    };
                    break;
                case "modules":
                    this.child = {
                        name     : "тести",
                        hrefPart : "tests"
                    };
                    break;
                case "tests":
                    this.child = {
                        name     : "питання",
                        hrefPart : "questions"
                    };
                    break;
                default:
                    this.child = "";
                    break;
            }
            this.insertView("#managementlist", new ManagementView({
                model: el,
                kind: this.name,
                child: this.child
            }));
        },

        addManagement: function () {
            if (this.name == "modules") {
                this.$el.find("#managementAddButton").addClass("disable");
                this.mode = "add";
                this.$el.find(".table-responsive").after(this.addEditModuleTemplate());
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
            } else {
                var managementName = _.escape(this.$el.find("#managementAddInput").val());
                if(!managementName) return;
                var management= new Model({name: managementName });
                management.url = this.collection.url();
                management.save();
                this.collection.fetch({reset:true});
            }
        },

        saveModule: function() {
            $("#module-name").removeClass("error");
            $("#module-name").popover("destroy");
            var module = new this.ModulesModule.Model([], {});
            console.log("aaa" + this.idParent);
            module.set({
                name: $("#module-name").val(),
                description: $("#moduleDescription").val(),
                courseId: this.idParent,
                available: $("#test-available").prop("checked"),
            });
            var that = this;
            module.save(null, {
                success: function(model, response){
                    console.log("bbb");
                    $("#module-form").trigger("reset");
                    $("#module-name").focus();
                    this.removeModuleTemplate();
                },
                error: function(model, responce) {
                    console.log("ups" + responce);
                }

            });
        },

        errorMessage: function (model, error) {
            $("#module-name").addClass("error");
            $("#module-name").popover({
                container: "body",
                title: error.title,
                content: error.message,
                placement: "right",
                trigger: "focus, hover"
            });
            $("#module-name").popover("toggle");
        },

        cancelModule: function() {
            this.removeModuleTemplate();
        },

        removeModuleTemplate: function() {
            this.$el.find(".table-responsive").next().remove();
            this.$el.find("#managementAddButton").removeClass("disable");
        }
     });

    return View;
});
