define(function(require, exports, module) {
    "use strict";

    var CMS = require("CMS"),

    View = CMS.View.extend({

        template: _.template(require("text!../templates/modulesTemplate.html")),
        el: false,
        initialize: function(options) {
            this.subscribed = options.subscribed;
        },
        serialize: function() {
            return {
                modules: this.collection,
                imgUrl: this.imgUrl,
                courseId : this.courseId,
                subscribed: this.subscribed
            };
        },
        events: {
            "click .save-anchor": "saveAnchor"
        },
        saveAnchor: function() {
            window.localStorage.setItem("scrollModuleList", window.pageYOffset);
        }
    });
    return View;
});