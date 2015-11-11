define(function(require) {
    "use strict";

    var CoreView = require("../view"),
    View = CoreView.extend({
        template: _.template(require("text!../templates/paginationTemplate.html")),
    });
    return View;
});