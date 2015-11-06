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
            "submit"                 : "submitHandler",
            "click .pagination li a" : "submitHandler",
            "click #test-mode"       : "submitHandler"
        },
        initialize: function(collection, options) {
            this.mode        = options.mode;
            this.toogleMode  = options.toogleMode;
            this.courseId    = options.courseId;
            this.moduleId    = options.moduleId;
            this.typeTest    = options.typeTest;
            this.userAnswers = options.storage;
            this.userAnswers.fetch();
            this.listenTo(this.collection, "reset sync request", this.render);
        },
        serialize: function(){
            return {
                "mode"       : this.mode,
                "toogleMode" : this.toogleMode,
                "test"       : this.model,
                "courseId"   : this.courseId,
                "moduleId"   : this.moduleId,
                "typeTest"   : this.typeTest
            };
        },
        beforeRender: function(){
            if(this.mode == "page"){
                this.insertView(
                    "nav", new PaginationView({collection: this.collection}, {answers: this.userAnswers})
                );
            }
            this.collection.each(this.renderOne, this);
        },
        renderOne: function(model) {
            var answer = "";
            if(this.userAnswers.get(model.get("num"))){
                answer = this.userAnswers.get(model.get("num")).get("answerUser");
            }
            this.insertView(".test", new TestView({model: model}, {answer: answer, typeTest: this.typeTest}).render());
        },
        submitHandler: function (e) {
            e.preventDefault();
            this.$form = this.$(".tests-form");
            var answerForm = this.$form.serializeObject();
            _.each(answerForm, function(value, key, list){
                var num = parseInt(key.substring(6, key.length));
                if (_.isArray(value)) {
                    value = _.map(value, function(answer){ return answer.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&#34;"); });
                }
                else {
                    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&#34;");
                }
                if (!_.isEmpty(value)) {
                    this.userAnswers.create({
                        id         : num,
                        moduleId   : parseInt(this.moduleId),
                        courseId   : parseInt(this.courseId),
                        answerUser : value
                    });
                }
                else if(!_.isUndefined(this.userAnswers.get(num))) {
                    this.userAnswers.get(num).destroy();
                }
            }, this);
            var checkboxEl = _.pluck(this.$form.find("[type='checkbox']"), "name");
            _.each(checkboxEl, function(arr){
                var num = Number(arr.match(/\d+/)[0]);
                if ((!(_.has(answerForm, arr)) )&&(!_.isUndefined(this.userAnswers.get(num)))) {
                    this.userAnswers.get(num).destroy();
                }
            }, this);
        }
    });

    return View;
});