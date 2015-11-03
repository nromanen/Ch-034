define(function(require) {
    "use strict";

    return {
        Collection: {
        	List    : require("./collections/TestsCollection"),
        	Page    : require("./collections/TestsPageableCollection"),
            Answers : require("./collections/AnswersCollection")
        },
        Model: {
            Test   : require("./models/TestModel"),
            Answer : require("./models/AnswerModel")
        },    
        Views: {
            Test: require("./views/TestView"),
            Tests: require("./views/TestsView")
        }
    };
});