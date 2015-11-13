define(function(require) {
    "use strict";

    var Backbone = require("backbone"),
        _sync = Backbone.sync,
        Model = Backbone.Model.extend({});

    Backbone.sync = function(method, model, options) {
        var session = JSON.parse(window.localStorage.getItem("UserSession"));
        
        if (session) {
            options.headers = {
                "x-access-token": session.token
            };
        }
       return _sync(method, model, options);
    };
    return Model;
});