define(function(require) {
    "use strict";

    return {
        Collection: {
        	List    : require("./collections/QuestionsCollection"),
        	Page    : require("./collections/QuestionsPageableCollection"),
            Answers : require("./collections/AnswersCollection")
        },
        Model: {
            Test     : require("./models/TestModel"),
            Answer   : require("./models/AnswerModel"),
            Question : require("./models/QuestionModel"),
        },
        Views: {
            Test: require("./views/TestView"),
            Tests: require("./views/TestsView")
        }
    };
});