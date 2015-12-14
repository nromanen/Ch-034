define(function(require) {
    "use strict";

    require("jquery-serialize-object");
    require('bootstrapdatetimepicker');
    require('ckeditor-jquery');

    var CMS = require("CMS"),
        moment = require('moment'),
        CourseModel = require('../models/courseModel'),
    View = CMS.View.extend({
        el: false,
        template: _.template(require("text!../templates/courseEditTemplate.html")),
        events: {
            'click #save_course': 'saveCourseHandler'
        },

        serialize: function() {
            return {
                model: this.model,
            };
        },

        initialize: function(options) {
            $.ajaxSetup({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("x-access-token", CMS.SessionModel.getItem('UserSession').token);
                }
            });
            if (!options.model) {
                this.model = new CourseModel();
            }
            this.listenTo(this.model, "reset", this.render, this);
        },
        getList: function(name) {
            var promise = $.ajax({
                url: CMS.api + name,
                method: "GET",
                dataType: "json",
                contentType: "application/json"
            });

            return promise;
        },
        beforeRender: function() {
            var _this = this;
            this.getList("areas").done(function(data) {
                _.each(data, function(item) {
                    var option = $(document.createElement("option")).val(item._id).text(item.name);
                    if (_this.model.get("area").name === item.name) {
                        option.attr("selected", true);
                    }
                    option.appendTo("#course_area");
                });
            });

            this.getList("groups").done(function(data) {
                _.each(data, function(item) {
                    var option = $(document.createElement("option")).val(item._id).text(item.name);
                    _.each(_this.model.get("groups"), function(group) {
                        if (group.name=== item.name) {
                            option.attr("selected", true);
                        }
                    });
                    option.appendTo("#group_type");
                });
            });
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
            var _this = this;
            this.$el.find('.course-schedule input[type="checkbox"]').each(function() {
                if (_this.model.get('schedule').indexOf(this.value) !== -1) {
                    $(this).attr("checked", true);
                }
            });

            this.$el.find('#course-'+this.model.cid+'_start_picker').datetimepicker({
                defaultDate: this.model.get('startDate'),
                format: 'MM/DD/YYYY',
                locale: 'uk'
            });
            this.$el.find('#course-'+this.model.cid+'_publishAt_picker').datetimepicker({
                defaultDate: this.model.get('publish_at'),
                format: 'MM/DD/YYYY HH:mm',
                locale: 'uk'
            });
            this.$el.find('#course-'+this.model.cid+'_unpublishAt_picker').datetimepicker({
                defaultDate: this.model.get('unpublish_at') ? this.model.get('unpublish_at'): false,
                format: 'MM/DD/YYYY HH:mm',
                locale: 'uk'
            });
        },
        saveCourseHandler: function() {
            var _this = this;
            var serialized = this.$el.serializeObject();
            this.model.set(serialized);
            this.model.save(null, {
                success: function(xhr) {
                    if (_this.model.isNew()) {
                        CMS.Event.trigger("model:created");
                    } else {
                        _this.model.fetch({reset: true});
                    }

                },
                error: function() {
                }
            });
        }
    });

    return View;
});
