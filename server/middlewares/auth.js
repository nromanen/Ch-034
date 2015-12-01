var jwt = require("jsonwebtoken"),
    User = require("../models/user");

module.exports = function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, req.app.get("superSecret"), function(err, decoded) {
            if (err) {
                res.status(403);
                return res.json({ success: false, message: "Failed to authenticate token." });
            } else {
                req.decoded = decoded;
                User
                    .findOne({email: decoded.name})
                    .select("-_courses -password")
                    .exec(function(err, user) {
                      if (err) next(err)
                        req.authUser = user;
                      next();
                    });
            }
        });
    } else {
      return res.status(403).send({
          success: false,
          message: "No token provided."
      });
    }
};