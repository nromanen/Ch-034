define(function(require) {
    "use strict";

    var CoreModel = require("../model"),

    SessionModel = CoreModel.extend({
        urlRoot: "http://localhost:8888/authenticate",
        initialize: function() {
            var that = this;
            if (typeof window.Storage !== "undefined") {
                this.supportsStorage = true;
            }

            $.ajaxSetup({
                statusCode: {
                    401: function(){
                        console.log("401 status");
                        that.clearSession();
                        Backbone.history.navigate("#login", {
                            trigger: true
                        });

                    },
                    403: function(){
                        console.log("403 status");
                        that.clearSession();
                        Backbone.history.navigate("#login", {
                            trigger: true
                        });
                    }
                }
            });
        },
        getItem: function(key) {
            if(this.supportsStorage){
                var data = window.localStorage.getItem(key);
                if(data && data[0] === '{'){
                    return JSON.parse(data);
                }else{
                    return data;
                }
            }
        },
        setItem: function(key, value) {
            if (this.supportsStorage) {
                window.localStorage.setItem(key, value);
            }
        },
        unsetItem: function(key) {
            if (this.supportsStorage) {
                window.localStorage.removeItem(key);
            }
        },
        clearSession: function() {
            if (this.supportsStorage) {
                window.localStorage.clear();
            }
        },
        login: function(credentials) {

            var that = this;
            this.save(credentials, {
                success: function(model, response) {
                    console.log("true");
                    console.log(response.token);
                    console.log(response.profile);
                    that.setItem("UserSession", JSON.stringify(response));
                    if (that.getItem("UserSession.targetPage")) {
                        var path = that.getItem("UserSession.targetPage");
                        console.log(path);
                        that.unsetItem("UserSession.targetPage");
                        Backbone.history.navigate(path, {
                            trigger: true
                        });
                    } else {
                        Backbone.history.navigate("", {
                            trigger: true
                        });
                    }
                },
                error: function(data) {
                    console.log("data");
                    Backbone.history.navigate("#login", {
                        trigger: true
                    });
                }
            });
        },
        logout: function(callback) {
            var that = this;
            this.delete({
                success: function() {
                    that.clearSession();
                    callback();
                }
            });
        }
    });

    return new SessionModel();

});