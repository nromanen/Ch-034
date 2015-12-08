var CronJob = require("cron").CronJob,
	User = require("../models/user"),
	Course = require("../models/course"),
	students = [],
	nodemailer = require("nodemailer"),
	express = require("express"),
	router = express.Router(),

    transporter = nodemailer.createTransport("SMTP", {
      service: 'Gmail',
      auth: {
        user: "ssita.cms@gmail.com", 
        pass: "ssita_cms"
      }
    }),

	job = new CronJob({
	    cronTime: "00 00 00 * * 1-5", // Запуск щодня о 00:00:00 (пн-пт)
	    onTick: function () {
	    	User.find({}, function (err, users, next) {
	    		if (err) {
	    			return next(err);
	    		} else {
	    			return students.concat(users);
	    		}
	    	});

	    	students.forEach(function (student) {
	    		student._courses.forEach(function (course) {
	    			if (Date.parse(course.startDate) - Date.parse(new Date()) < 864000000 ) {
	    				var message = {
	    					from: "Softserve ITA <ssita.cms@gmail.com>",
				            to: student.email,
				            subject: "Відновлення паролю", 
				            text: "Привіт " + student.name + "! Повідомляєм про те, що курс " + course.name + " почнеться менш, ніж за 10 днів."
	    				};
	    				transporter.sendMail(message, function (err, res) {
	    					if (err) {
	    						return next (err);
	    					} else {
	    						console.log("Повідомлення надіслано успішно" + res.message);
	    					}
	    				});
	    			} else {
	    				return next();
	    			}
	    		});
	    	});
	    },
	    start: false, 
	    timeZone: ""
	});
	job.start();

module.exports = job;