define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({

        template: _.template(require("text!../templates/moduleTemplate.html")),

        el: false,

        initialize: function() {
            this.listenTo(this.model, "reset sync request", this.render);
        },

        serialize: function() {
            return {
                module: this.model,
                downloadable: CMS.downloadable,
                embeddable: CMS.embeddable
            };
        }
    });

    return View;
});