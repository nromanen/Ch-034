define(function(require) {
    "use strict";

    return {
        Collection: require("./collection"),
        View: require("./view"),
        Model: require("./model"),

        CoreView: require("./views/CoreView"),

        PageableCollection: require("./collections/PageableCollection"),
        PaginationView: require("./views/PaginationView")
    };

});