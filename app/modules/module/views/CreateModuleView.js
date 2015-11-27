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
                    editor.on('fileUploadRequest', function( evt ) {
                            console.log("asdasdasdasd");
                            var xhr = evt.data.fileLoader.xhr;

                            xhr.setRequestHeader( 'ContentType', "form/multi-part");
                            xhr.setRequestHeader( 'x-access-token', CMS.SessionModel.getItem('UserSession').token );
                            xhr.setRequestHeader( 'Cache-Control', 'no-cache' );

                        } );
                    }, 5);
            });

            $("module-name").focus();
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
                available: $("#test-available").prop("checked")
            });
            this.model.save(null, {
                success: function(model, response){
                    $("#module-form").trigger("reset");
                    $("#module-name").focus();
                },
                error: function(model, error){
                    console.log(error);
                },
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