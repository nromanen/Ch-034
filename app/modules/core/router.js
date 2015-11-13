define(function(require) {
    "use strict";
    var Backbone = require("backbone");
    //http://danialk.github.io/blog/2013/06/08/backbone-tips-after-and-before-methods-for-router/
    Backbone.Router.prototype.before = function () {};
    Backbone.Router.prototype.after = function () {};

    Backbone.Router.prototype.route = function (route, name, callback) {
       if (!_.isRegExp(route)) route = this._routeToRegExp(route);
          if (_.isFunction(name)) {
              callback = name;
              name = '';
          }
          if (!callback) callback = this[name];

          var router = this;

          Backbone.history.route(route, function(fragment) {
              var args = router._extractParameters(route, fragment);

              var next = function(){
                  callback && callback.apply(router, args);
                  router.trigger.apply(router, ['route:' + name].concat(args));
                  router.trigger('route', name, args);
                  Backbone.history.trigger('route', router, name, args);
                  router.after.apply(router, args);        
              };
              router.before.apply(router, [args, next]);
          });
          return this;
    };

    var CoreRouter = Backbone.Router.extend({});

    return CoreRouter;
});