define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    
    View = CMS.View.extend({
        template: _.template(require("text!../templates/sidebarTemplate.html")),

        el: false
        
    });

    return View;
});