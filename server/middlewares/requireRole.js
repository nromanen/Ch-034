var jwt = require("jsonwebtoken"),
    User = require("../models/user");

module.exports = function (role) {
  role = [].concat(role);

  return function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (err) {

      return next(err);

    }

    if (token) {

      jwt.verify(token, req.app.get("superSecret"), function (err, decoded) {

        if (err) {

          return next(err);

        } else {

          User.findOne({email: decoded.name}, function (err, user) {

            if (err) {

              return next(err);

            }

            if (user) {

              role.forEach(function (role) {

                if (user.role === role) {

                  return next();

                } else {

                  return res
                          .status(401)
                          .send({
                            success: false, 
                            message: "Woooops, access denied!"
                          });

                }

              });
                
            } else {

              return next(err);

            }

          });

        };

      });

    } else {

      return next(err);

    };
  };
};