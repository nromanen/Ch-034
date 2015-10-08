define(function(require) {
    "use strict";

    var CMS = require("CMS");
    
    var View = CMS.View.extend({
        template: _.template(require("text!../templates/courseTemplate.html")),

        el: false,

        render: function() {
            return this.template(this.model.toJSON());
        }
    });

    return View;
});