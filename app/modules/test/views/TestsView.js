define(function(require) {
    "use strict";

    require("jquery-serialize-object");

    var CMS = require("CMS"),
        TestView = require("./TestView"),
        PaginationView = require("./PaginationView"),
        TestModel = require("modules/test/models/TestModel"),

    View = CMS.View.extend({
        template: _.template(require("text!../templates/testsTemplate.html")),
        el: false,
        events: {
            "change .form-control"     : "saveAnswers",
            "change .form-checkbox"    : "saveAnswers",
            "keyup .form-control"      : "saveAnswers",
            "click #btn-submit"        : "submitHandler",
            "click #btn-forbid-submit" : "submitForbid",
            "click #next-question"     : "nextQuestion"
        },
        initialize: function(collection, options) {
            this.mode        = options.mode;
            this.page        = options.page;
            this.toogleMode  = options.toogleMode;
            this.courseId    = options.courseId;
            this.moduleId    = options.moduleId;
            this.typeTest    = options.typeTest;
            this.userAnswers = options.storage;
            this.userAnswers.fetch();
            this.countAnswer = this.userAnswers.length;
            this.test = new TestModel({id: this.moduleId});
            this.test.fetch();
            this.sendModal = new CMS.ModalView({
                modalHeader  : "Ви впевнені, що завершили проходження тестування та готові відправити дані на перевірку?",
                submitButton : "Так, відправити на перевірку"
            });
            this.listenTo(this.collection, "reset sync request", this.render);
        },
        serialize: function(){
            if (this.mode == 'page') {
                this.countQuestions = this.collection.info().totalPages;
            }
            else {
                this.countQuestions = this.collection.length;
            }
            return {
                mode           : this.mode,
                page           : this.page,
                toogleMode     : this.toogleMode,
                test           : this.test,
                typeTest       : this.typeTest,
                countQuestions : this.countQuestions,
                countAnswer    : this.countAnswer
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
        afterRender: function () {
            this.btnCtrl();
        },
        renderOne: function(model) {
            var answer = "";
            if(this.userAnswers.get(model.get("num"))){
                answer = this.userAnswers.get(model.get("num")).get("answerUser");
            }
            this.insertView(".test", new TestView({model: model, answer: answer, typeTest: this.typeTest}).render());
        },
        saveAnswers: function () {
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
            if(this.mode == "page"){
                this.setView(
                    "nav", new PaginationView({collection: this.collection}, {answers: this.userAnswers})
                ).render();
            }
            this.btnCtrl();
        },
        submitHandler: function (e) {
            e.preventDefault();
            this.saveAnswers();
            this.sendModal.render();
            this.sendModal.show();
        },
        nextQuestion: function (e) {
            e.preventDefault();
            this.$el.find('.pagination li a#' + (Number(this.page || 1) + 1)).click();
        },
        submitForbid: function (e) {
            e.preventDefault();
        },
        btnCtrl: function () {
            var btnTemplate = '';
            if (this.countQuestions == this.userAnswers.length) {
                btnTemplate = "<button id='btn-submit' type='submit' class='btn btn-success'>Завершити тестування</button>";
            }
            else if (this.mode == "list" || (this.mode == "page" && this.countQuestions == this.page)) {
                btnTemplate = "<button id='btn-forbid-submit' class='btn btn-success disabled'>Завершити тестування</button>";
            }
            else {
                btnTemplate = "<button id='next-question' class='btn btn-default'>Наступне питання</button>";
            }
            this.$el.find("#test-submit").html(btnTemplate);
        }
    });
    return View;
});