define(function(require) {
    "use strict";

    require("jquery-serialize-object");

    var CMS = require("CMS"),            
        TestView = require("./TestView"),
        PaginationView = require("./PaginationView"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/testsTemplate.html")),
        el: false,

        events: {
            "submit" : "submitHandler"
        },
        initialize: function(collection, options) {
            this.mode        = options.mode;
            this.toogleMode  = options.toogleMode;
            this.courseId    = options.courseId;
            this.moduleId    = options.moduleId; 
            this.typeTest    = options.typeTest;
            this.userAnswers = options.storage; 
            this.listenTo(this.collection, "reset sync request", this.render);           
        },
        serialize: function(){
            return {
                'mode'       : this.mode,
                'toogleMode' : this.toogleMode,
                'test'       : this.model,
                'courseId'   : this.courseId,
                'moduleId'   : this.moduleId,
                'typeTest'   : this.typeTest
            };
        },
        beforeRender: function(){
            if(this.mode == 'page'){
                this.insertView(
                    'nav', new PaginationView({collection: this.collection})
                );  
            }
            this.collection.each(this.renderOne, this);            
        },
        renderOne: function(model) {
            this.insertView('.test', new TestView({model: model}, {typeTest: this.typeTest}).render());
        },
        submitHandler: function (e) {
                e.preventDefault();                
                this.$form = this.$el.find('.tests-form');
                this.userAnswers.set(this.$form.serializeObject());
        }
    });

    return View;
});