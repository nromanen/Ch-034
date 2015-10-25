define(function(require) {
    "use strict";

    var Backbone = require("backbone"),
        _ = require("lodash"),

    Event = _.extend({}, Backbone.Events);

    return Event;
});