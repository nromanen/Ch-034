define(function(require) {
    var CMS = require("CMS"),

    Collection = CMS.Collection.extend({
        url: function() {
            return CMS.api + "groups";
        },
        getName: function() {
            return "Group";
        }
    });
    return Collection;
});