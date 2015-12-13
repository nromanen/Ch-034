define(function(require, exports, module) {
    "use strict";

    require('ckeditor-jquery');

    var CMS = require("CMS"),
    ResourcesView = require("../../resource/views/ResourcesView"),
    ResourcesCollection = require("../../resource/collections/ResourcesCollection"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/moduleEditTemplate.html")),
        el: false,

        events: {
            "click #save_module": "saveModuleHandler",
        },

        initialize: function(options) {
            this.model = options.model;
            this.listenTo(this.model, "invalid", this.errorMessage);
        },

        serialize: function() {
            var module = this.model;
            module.attributes.courseId = this.model.courseId;
            return {
                module: module,
            };
        },

        afterRender: function() {
            $(document).ready(function() {

                _.delay(function() {
                    var editor = $("#module_description").ckeditor({
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
            var Resources = new ResourcesCollection([], {moduleId: this.model.id});
            Resources.fetch();
            this.insertView("#module_resources", new ResourcesView({collection: Resources}, {moduleId: this.model.id})).render();
        },

        saveModuleHandler: function () {
            this.$el.find("#module_name").removeClass("error");
            this.$el.find("#module_name").popover("destroy");
            var _this = this;
            var serialized = this.$el.serializeObject();
            this.model.set(serialized, {validate: true});
            if(!this.model.validationError) {
                this.model.save(null, {
                    success: function() {
                        _this.model.fetch({reset: true});
                    },
                    error: function() {
                    }
                });
            }
        },

        errorMessage: function (model, error) {
            this.$el.find("#module_name").addClass("error");
            this.$el.find("#module_name").popover({
                container: "body",
                name: error.name,
                content: error.message,
                placement: "bottom",
                trigger: "focus, hover"
            });
            this.$el.find("#module_name").popover("toggle");
        }

    });
    return View;
});