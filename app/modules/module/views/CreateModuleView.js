define(function(require, exports, module) {
    "use strict";

    require('ckeditor-jquery');

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/createModuleTemplate.html")),
        el: false,

        events: {
            "click #test-btn": "submitHandler"
        },

        initialize: function(options) {
            this.model = options.model;
            this.courseId = options.courseId;
            this.listenTo(this.model, "invalid", this.errorMessage);
            this.listenTo(this.model, "reset sync request", this.render);
            this.edit = options.edit;
        },

        afterRender: function() {
            $(document).ready(function() {

                _.delay(function() {
                    var editor = $("#description").ckeditor({
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
            $("module-name").focus();
            if (this.edit === true) {
                $("#module-name").val(this.model.attributes.title);
                $("#description").val(this.model.attributes.description);
                document.getElementById("test-available").checked = this.model.attributes.available;
            }
        },

        submitHandler: function (e) {
            e.preventDefault();
            this.saveModule();
        },

        saveModule: function () {
            $("#module-name").removeClass("error");
            $("#module-name").popover("destroy");
            this.model.set({
                title: $("#module-name").val(),
                description: $("#description").val(),
                courseId: this.courseId,
                available: $("#test-available").prop("checked"),
            });
            var that = this;
            this.model.save(null, {
                success: function(model, response){
                    $("#module-form").trigger("reset");
                    $("#module-name").focus();

                    if (that.edit) {
                        Backbone.history.navigate("#courses/" + that.courseId + "/modules/" + that.model.id, {
                            trigger: true
                        });
                    } else {
                        Backbone.history.navigate("#courses/" + that.courseId, {
                            trigger: true
                        });
                    }
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
    });
    return View;
});