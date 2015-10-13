define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    
    View = CMS.View.extend({
        template: _.template(require("text!../templates/testTemplate.html")),
        
        el: '.test', 

        initialize: function(){
            this.render();                
        },

        render: function() {  
            return this.template(this.model.toJSON());
        }
    });

    return View;
});