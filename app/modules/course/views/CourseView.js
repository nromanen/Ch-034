define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    
    View = CMS.View.extend({
        template: _.template(require("text!../templates/courseTemplate.html")),

        el: false,

        events: {
            'click .btn': "check"
        },

        serialize: function() {
            return { course: this.model };
        },

        check: function(ev){
            console.log(this.model);
            console.log($(ev.target));
        }
    });

    return View;
});