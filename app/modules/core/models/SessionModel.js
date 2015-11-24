define(function(require) {
    "use strict";

    var CoreModel = require("../model"),

    SessionModel = CoreModel.extend({
        urlRoot: "http://localhost:8888/api/authenticate",
        initialize: function() {
            var that = this;
            if (typeof window.Storage !== "undefined") {
                this.supportsStorage = true;
            }
            $.ajaxSetup({
                statusCode: {
                    401: function(){
                        that.clearSession();

                        Backbone.history.navigate("#login", {
                            trigger: true
                        });
                    },
                    403: function(){
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
        login: function(credentials, callback) {
            var that = this,
            login = this.save(credentials);
            login.done(function(response) {
                that.setItem("UserSession", JSON.stringify(response));
                if (that.getItem("UserSession.targetPage")) {
                    var path = that.getItem("UserSession.targetPage");
                    that.unsetItem("UserSession.targetPage");
                    Backbone.history.navigate(path, {
                        trigger: true
                    });
                } else {
                    Backbone.history.navigate("", {
                        trigger: true
                    });
                }
            });
            login.fail(function(jqXHR) {
                if (callback) {
                    callback(jqXHR, jqXHR.responseJSON.message);
                }
            });
        },
        getAuth: function(token) {
            var that = this,
            check = $.ajax({
                url: this.urlRoot+"/check_auth",
                type: "POST",
                dataType: 'JSON',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("x-access-token", token);
                }
            });
            check.done(function(response) {

                that.setItem("UserSession.authenticated", true);
                return true;
            });
            check.fail(function(response) {
                that.setItem("UserSession.authenticated", false);
                return false;
            });
        },
        logout: function(callback) {
            this.clearSession();
            callback();
        }
    });
    return new SessionModel();
});