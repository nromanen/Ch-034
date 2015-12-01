define(function (require) {
  "use strict";

  var CMS = require("CMS"),
      Model = CMS.Model.extend({
        defaults: {
          email: null
        },
        urlRoot: CMS.api + "reset"
      });

  return Model;
});