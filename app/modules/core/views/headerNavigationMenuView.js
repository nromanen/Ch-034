define(function(require) {
    "use strict";

    var View = require("../view"),
    HeaderNavigationMenuView = View.extend({
        template: _.template(require("text!../templates/headerNavigationMenuTemplate.html")),
        el: false
    });
    return HeaderNavigationMenuView;
});