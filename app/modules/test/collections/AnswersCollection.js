define(function(require) {
    "use strict";

    require("backbone.localStorage");

    var CMS = require("CMS"),
        Answer = require("../models/AnswerModel"),

    Collection = CMS.Collection.extend({
        model        : Answer,
        localStorage : new Backbone.LocalStorage("userAnswersCollection"),
        comparator: function(model){
            return model.get("id");
        },
        clearCollection: function() {
            for(var prop in localStorage) {
                if(prop.search(/userAnswersCollection/) != -1) {
                    localStorage.removeItem(prop);
                }
            }
        }
    });

    return Collection;
});