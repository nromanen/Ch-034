var CronJob = require("cron").CronJob,
	User = require("../models/user"),
	Course = require("../models/course"),
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
	    	User.find()
	    		.populate("_courses")
	    		.exec(function (err, users) {
		    		if (err) {
		    			throw err;
		    		} 
		    	users.forEach(function (student) {
		    		student._courses.forEach(function (course) {
		    			if ((Date.parse(course.startDate) - Date.parse(new Date())) < 864000000 && (Date.parse(course.startDate)) >= Date.parse(new Date())) {
		    				var message = {
		    					from: "Softserve ITA <ssita.cms@gmail.com>",
					            to: student.email,
					            subject: "Курс "+course.name+" скоро розпочнеться", 
					            text: "Привіт " + student.name + "! Повідомляєм про те, що курс " + course.name + " почнеться менш, ніж за 10 днів."
		    				};
		    				transporter.sendMail(message, function (err, res) {
		    					if (err) throw err;
									console.log("Повідомлення надіслано успішно" + res.message);
		    					
		    				});
		    			} else {
		    				return;
		    			}
		    		});
		    	});
	    	});
	    	
	    },
	    start: false, 
	    timeZone: "Europe/Kiev"
	});
	job.start();

module.exports = job;