define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        vacanciesModule = require("modules/vacancies/index"),
    
    View = CMS.View.extend({
        template: _.template(require("text!../templates/vacancyTemplate.html")),

        el: false,

        serialize: function() {
            return {
                model: this.model
            };
        }
        
    });

    return View;
});