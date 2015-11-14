define(function(require) {
    "use strict";

    var View = require("../view"),
        HeaderPersonalMenuView = View.extend({
            template: _.template(require("text!../templates/headerPersonalMenuTemplate.html")),
            el: false
        });
    return HeaderPersonalMenuView;
});