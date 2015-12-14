define(function(require) {
    "use strict";

    var CMS = require("CMS"),

        View = CMS.View.extend({
            template: _.template(require("text!../templates/managementMenuTemplate.html")),
            el: false,
            initialize: function() {
                this.listenTo(this.model, "sync", this.render, this);
            },
            serialize: function() {
                return {
                    menu: this.model,
                };
            }
    });
    return View;
});