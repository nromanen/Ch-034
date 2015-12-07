define(function (require) {
  "use strict";

  var CMS = require("CMS"),
      Model = require("../model/resetModel"),
      View = CMS.View.extend({
        template: _.template(require("text!../template/resetTemplate.html")),
        el: false,
        initialize: function () {
          this.model = new Model();
          //this.listenTo(this.model, "change", )
        },
        events: {
          "submit": "submitHandler"
        },
        serialize: function () {
          return {model: this.model};
        },
        afterRender: function () {
          this.$el.find(".error-message").addClass("hidden");
        },
        submitHandler: function (e) {
          e.preventDefault();
          this.model.save({email: this.$el.find("#email").val()});
        }
      });

  return View;
});