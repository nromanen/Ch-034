define(function(require) {
    "use strict";

    var CMS = require("CMS"),
        TestView = require("./TestView"),
        PaginationView = require("./PaginationView"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/testsTemplate.html")),
        el: false,
        
        initialize: function(collection, options) {
            this.mode = options.mode;
            this.listenTo(this.collection, "reset sync request", this.render);           
        },

        beforeRender: function(){   
            if(this.mode == 'page'){
                this.insertView(
                    'nav', new PaginationView({collection: this.collection})
                );  
            };
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