define(function(require) {
    "use strict";

    return {
        Collection: require("./collections/vacanciesCollection"),
        Model: require("./models/vacancyModel"),
        View: require("./view/vacancyView"),
    };
});