define(function(require, exports, module) {
    "use strict";

    module.exports = {
        Model: require("./item/model"),
        Collection: require("./collection"),
        Views: {
            Item: require("./item/view"),
            List: require("./list/view")
        }
    };
});