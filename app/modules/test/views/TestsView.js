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
            this.courseId = options.courseId;
            this.moduleId = options.moduleId; 
            this.typeTest = options.typeTest;
            this.listenTo(this.collection, "reset sync request", this.render);           
        },
        serialize: function(){
            return {
                'test'     : this.model,
                'courseId' : this.courseId,
                'moduleId' : this.moduleId,
                'typeTest' : this.typeTest
            };
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
            this.insertView('.test', new TestView({model: model}, {typeTest: this.typeTest}).render());
        }
    });

    return View;
});