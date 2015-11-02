define(function(require) {
    "use strict";

    return {
        Collection: require("./collections/vacanciesCollection"),
        Model: require("./models/vacancyModel"),
        Views: {
            Vacancy:   require("./views/vacancyView"),
            Vacancies: require("./views/vacanciesView"),
        },
    };
});