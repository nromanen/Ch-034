define(function(require) {
    "use strict";

    var View = require("../view"),


    HeaderView = View.extend({
        template: _.template(require("text!../templates/headerTemplate.html")),
        el: false,
    });
    return HeaderView;
});