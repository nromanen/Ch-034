define(function(require) {
    var CMS = require("CMS"),

    Collection = CMS.Collection.extend({
        url: function() {
            return CMS.api + "areas";
        },
        getName: function() {
            return "Area";
        }
    });
    return Collection;
});