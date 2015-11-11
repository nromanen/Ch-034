define(function(require) {
    "use strict";

    var View = require("../view"),
    FooterView = View.extend({
        template: _.template(require("text!../templates/footerTemplate.html")),
        el: false
    });
    return FooterView;
});