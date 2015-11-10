var express = require("express"),
	router = express.Router(),
	bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
	User = require("../models/user");

router.post("/", function(req, res, next) {
	var newUser = new User({
        email: req.body.email,
        fullName: req.body.name+" "+req.body.surname,
        password: req.body.pass,
        role: req.body.role
	});

	User
		.findOne({"email": newUser.email})
		.exec(function(err, user) {
			if (err) next(err);
			if (user) {
				return res
					.status(401)
					.json({"success": false, "message": "This email is already registered"});
			} else {
				newUser.save(function(err, user) {
					if (err) next(err);
					return res
						.type("application/json")
						.status(200)
						.send(JSON.stringify({"success": true, "message": "registration successufull"}));
				})
			}
	})
})
router.post("/check_email", function(req, res, next) {
	console.log(req.body.email);
	User
		.findOne({"email": req.body.email})
		.exec(function(err, user) {
			if (err) next(err);
			if (user) {
				return res
					.status(401)
					.json({"success": false, "message": "This email is already registered"});
			} else {
				return res
					.status(200)
					.json({"success": true,"message": "This email is free to use"});
			}
		})
})

module.exports = router;