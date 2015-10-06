define(function(require, exports, module) {
    "use strict";

    module.exports = {
        Collection: require("./collection"),
        Views: {
            Index: require("./view"),
            Item: require("./item/view"),
            List: require("./list/view")
        }
    };
});