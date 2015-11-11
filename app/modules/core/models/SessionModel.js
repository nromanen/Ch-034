define(function(require) {
    "use strict";

    var CoreModel = require("../model"),

    SessionModel = CoreModel.extend({
        urlRoot: "http://localhost:8888/api/authenticate",
        initialize: function() {
            if (Storage && localStorage) {
                this.supportsStorage = true;
            }
        },

        login: function(credentials) {
            this.save(credentials, {
                success: function(model, response) {

                },
                error: function(data) {
                    console.log(data);
                }
            });
        }
    });

    return new SessionModel();

});