define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    
    View = CMS.View.extend({
        template: _.template(require("text!../templates/testTemplate.html")),
        
        el: false, 

        serialize: function(){
            return {
                'test': this.model
            };
        }

    });

    return View;
});