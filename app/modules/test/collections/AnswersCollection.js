define(function(require) {
    "use strict";

    require("backbone.localStorage");

    var CMS = require("CMS"),
        Answer = require("../models/AnswerModel"),

    Collection = CMS.Collection.extend({
        model        : Answer,
        localStorage : new Backbone.LocalStorage("userAnswersCollection")
    });

    return Collection;
});