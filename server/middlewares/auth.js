var jwt = require("jsonwebtoken"),
    User = require("../models/user"),
    Profile = require("../models/profile");

module.exports = function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, req.app.get("superSecret"), function(err, decoded) {
            if (err) {
                res.status(403);
                return res.json({ success: false, message: "Не вдалося перевірити токен аутентифікації." });
            } else {
                req.decoded = decoded;
                User
                    .findOne({email: decoded.name})
                    .select("-password")
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
          message: "Не передався токен."
      });
    }
};