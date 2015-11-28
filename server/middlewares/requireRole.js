var async = require("async"),
    jwt = require("jsonwebtoken"),
    User = require("../models/user");

module.exports = function (role) {
  role = [].concat(role);

  return function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (token) {

      async.waterfall([

        function (cb) {
          jwt.verify(token, req.app.get("superSecret"), cb);
        },

          function (decoded, cb) {
            User.findOne({email: decoded.name}, cb);
          },

            function (user, cb) {
              role.forEach(function (role) {
                if(user.role === role) {
                  return next();
                });
              }
            }
      ], cb(err) );
     
    } else {

      return next(err);

    };
  };
};