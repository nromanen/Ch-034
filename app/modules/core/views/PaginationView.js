define(function(require) {
    "use strict";

    var CoreView = require("../view");

    var View = CoreView.extend({

        template: _.template(require("text!../templates/paginationTemplate.html")),

        el: ".pagination",

    });



    return View;
});