define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/moduleTemplate.html")),

        initialize: function() {
            this.listenTo(this.model, "reset sync request", this.render);
        }

    });

    return View;
});    