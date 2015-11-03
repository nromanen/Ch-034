define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        VacancyView = require("../views/vacancyView"),

    View = CMS.View.extend({
        template: _.template(require("text!../template/vacancyTemplate.html")),

        el: false,

        beforeRender: function(){
            console.log(this.collection.length);
            this.collection.each(function(model){

                console.log(model);
            }, this);
        }
    });

    return View;
});