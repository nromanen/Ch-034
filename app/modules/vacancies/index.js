define(function(require) {
    "use strict";

    return {
        Collection: require("./collections/vacanciesCollection"),
        Model: require("./models/vacancyModel"),
        Vacancies:  require("./views/vacanciesView")
    };
});