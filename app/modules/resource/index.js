define(function(require) {
    "use strict";

    return {
        Model: require("./models/ResourceModel"),
        Collection: require("./collections/ResourcesCollection"),
        Views: {
            Resource: require("./views/ResourceView"),
            Resources: require("./views/ResourcesView"),
        },
    };
});