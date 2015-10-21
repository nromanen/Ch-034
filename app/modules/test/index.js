define(function(require) {
    "use strict";

    return {
        Collection: require("./collections/TestsCollection"),
        Model: require("./models/TestModel"),
        Views: {
            Test: require("./views/TestView"),
            Tests: require("./views/TestsView")
        }
    };
});