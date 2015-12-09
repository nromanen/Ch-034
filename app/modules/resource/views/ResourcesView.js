define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        ResourceView = require("./ResourceView"),
        Resource = require("../models/ResourceModel"),

    View = CMS.View.extend({

        template: _.template(require("text!../templates/resourcesTemplate.html")),
        el: false,

        events: {
            "click #save-module-resources": "",
            "click #cancel-rosources": "backToEditModule",
            "click #addResource" : "addResource",
            "change #addResourceType" : "onTypeSelected"
        },

        initialize: function(options) {
            this.listenTo(this.collection, "reset sync request", this.render);
            this.courseId = options.courseId;
            this.moduleId = options.moduleId;
        },
        serialize: function() {
            var resources = this.collection;
            resources.moduleId = this.moduleId;
            return {
                resources: resources
            };
        },
        beforeRender: function() {
            this.collection.each(this.renderOne, this);
        },
        renderOne: function(model) {
            this.insertView("#resources", new ResourceView({
                model: model,
                moduleId: this.moduleId
            }));
        },
        afterRender: function() {
            this.fillingSelect();
            this.onTypeSelected();
        },
        fillingSelect: function() {
            var typeOptions = this.createOptions(CMS.downloadable);
            typeOptions = typeOptions + this.createOptions(CMS.embeddable);
            $('#addResourceType').html(typeOptions);
        },
        createOptions: function(array, selectedOpt){
            var options = "";
            var len = array.length;
            for (var i = 0; i < len; i++) {
                options = options + "<option value=" + array[i];
                if ((selectedOpt != "undefined") && (array[i] === selectedOpt)) {
                    options = options + " selected = selected ";
                }
                options = options + ">" + array[i] +"</option>";
            }
            return options;
        },
        onTypeSelected: function() {
            var tag;
            if (CMS.externalLink.indexOf($('#addResourceType option:selected').text()) !== -1) {
                tag = "<input type='text'></input>";
            } else {
                tag = "<input type='file'></input>";
            }
            $("#addResourceUrl").html(tag);
        },
        backToEditModule: function() {
            var that = this;
            Backbone.history.navigate("#courses/" + that.courseId + "/modules/" + that.moduleId + "/edit", {
                trigger: true
            });
        },
        addResource: function() {
            var that = this;
            if (CMS.externalLink.indexOf($('#addResourceType option:selected').text()) === -1) {
                $.ajaxSetup({
                    beforeSend: function(jqXHR){
                        jqXHR.setRequestHeader("x-access-token", CMS.SessionModel.getItem("UserSession").token);
                        jqXHR.setRequestHeader("Access-Control-Allow-Origin", "*");
                        //jqXHR.setRequestHeader("Content-Type", "multipart/form-data");
                    },
                });
                var data = new FormData();
                data.append("key", $("#addResourceUrl").find('input')[0].files[0]);
                $.ajax({
                    url: CMS.api + "upload/resource",
                    type: 'POST',
                    data: data,
                    //cache: false,
                    //dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function( respond, textStatus, jqXHR ){
                        if( typeof respond.error === 'undefined' ){
                            var files_path = respond.files;
                            var resource = new Resource();
                            resource.set({
                                name: $("#addResourceName").val(),
                                moduleId: that.moduleId,
                                type: $("#addResourceType").val(),
                                url: files_path
                            });

                            resource.save(null, {
                                success: function(resource, response){
                                    that.collection.fetch({reset:true});
                                }
                            });
                        }
                    },
                    error: function( jqXHR, textStatus, errorThrown ){
                        console.log('ОШИБКИ AJAX запроса: ' + textStatus );
                    }
                });
            } else {
                var resource = new Resource();
                resource.set({
                    name: $("#addResourceName").val(),
                    moduleId: this.moduleId,
                    type: $("#addResourceType").val(),
                    url: $("#addResourceUrl").find('input').val()
                });
                resource.save(null, {
                    success: function(resource, response){
                        that.collection.fetch({reset:true});
                    }
                });
            }
        }
    });
    return View;
});