define(function(require) {
    "use strict";

    return {
        Collection: {
        	List: require("./collections/TestsCollection"),
        	Page: require("./collections/TestsPageableCollection")
        },
        Model: require("./models/TestModel"),
        Views: {
            Test: require("./views/TestView"),
            Tests: require("./views/TestsView")
        }
    };
});