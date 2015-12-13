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
            "click #cancelAddResource" : "clearAddResource",
            "change #addResourceType" : "onTypeSelected",
            "click #addResourceUrl input" : "chooseResourceClick"
        },

        initialize: function(collection, options) {
            this.model = new Resource();
            this.listenTo(this.model, "invalid", this.errorMessage);
            this.listenTo(this.collection, "reset sync request", this.render);
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
            })).render();
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
            if (CMS.externalLink.indexOf($('#addResourceType option:selected').text()) === -1) {
                tag = "<input type='file' id='addResourceFile' accept='application/" + $('#addResourceType option:selected').text() + "'></input>";
            } else {
                tag = "<input type='text'></input>";
            }
            $("#addResourceUrl").html(tag);
        },
        addResource: function() {
            var _this = this;
            if (CMS.externalLink.indexOf($('#addResourceType option:selected').text()) === -1) {
                if ($("#addResourceUrl").find('input')[0].files[0]) {
                    $.ajaxSetup({
                        beforeSend: function(jqXHR){
                            jqXHR.setRequestHeader("x-access-token", CMS.SessionModel.getItem("UserSession").token);
                            jqXHR.setRequestHeader("Access-Control-Allow-Origin", "*");
                        },
                    });
                    var data = new FormData();
                    data.append("key", $("#addResourceUrl").find('input')[0].files[0]);
                    $.ajax({
                        url: CMS.api + "upload/resource",
                        type: 'POST',
                        data: data,
                        processData: false,
                        contentType: false,
                        success: function( respond, textStatus, jqXHR ){
                            if( typeof respond.error === 'undefined' ){
                                var files_path = respond.url;
                                _this.model.set({
                                    name: $("#addResourceName").val(),
                                    moduleId: _this.moduleId,
                                    type: $("#addResourceType").val(),
                                    url: files_path
                                });
                                _this.model.save(null, {
                                    success: function(resource, response){
                                        _this.collection.fetch({reset:true});
                                    }
                                });
                            }
                        },
                        error: function( jqXHR, textStatus, errorThrown ){
                            console.log('ОШИБКИ AJAX запроса: ' + textStatus );
                        }
                    });
                } else {
                    this.model.save();
                }
           } else {
                this.model.set({
                    name: $("#addResourceName").val(),
                    moduleId: this.moduleId,
                    type: $("#addResourceType").val(),
                    url: $("#addResourceUrl").find('input').val()
                });
                this.model.save(null, {
                    success: function(resource, response){
                        _this.collection.fetch({reset:true});
                    }
                });
            }
        },
        chooseResourceClick: function() {
            this.$el.find('#addResourceUrl input').removeClass("error");
            this.$el.find('#addResourceUrl input').popover("destroy");
        },
        clearAddResource: function() {
            this.$el.find('#addResourceName')
                    .val("")
                    .removeClass("error")
                    .popover("destroy");
            this.$el.find('#addResourceType option:selected').text(CMS.downloadable[0]);
            var control = this.$el.find('#addResourceUrl input');
            control.replaceWith( control = control.clone( true ) );
            this.chooseResourceClick();
        },
        errorMessage: function (model, errors) {
            _.forEach(errors, function (error) {
                this.$el.find('#addResource' + error.inputName).addClass("error");
                this.$el.find('#addResource' + error.inputName).popover({
                    container: "body",
                    name: error.title,
                    content: error.message,
                    placement: "right",
                    trigger: "focus, hover"
                });
                this.$el.find('#addResource' + errors.inputName).popover("toggle");
            }, this );
        },
    });
    return View;
});