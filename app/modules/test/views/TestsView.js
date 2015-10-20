define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        TestView = require("./TestView"),
        PaginationView = require("./PaginationView"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/testsTemplate.html")),
        el: false, 

        initialize: function() {
            this.listenTo(this.collection, "reset sync request", this.render);
        },

        beforeRender: function(){  
            this.insertView(
                '.pagination', new PaginationView({collection: this.collection})
            ); 
            this.collection.each(this.renderOne, this);            
        },

        renderOne: function(model) {
            this.insertView('.test', new TestView({
                    model: model
            }).render());  

        }

    });

    return View;
});