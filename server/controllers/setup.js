var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Course = require('../models/course'),
    Area = require('../models/area'),
    Group = require('../models/group');
    Module = require('../models/module');

router.get('/', function(req, res) {

    var ui = new Area({
        name: "UI"
    });
    var java = new Area({
        name: "Java"
    });
    var design = new Area({
        name: "Design"
    });
    var net = new Area({
        name: ".Net"
    });
    var early = new Group({
        name: "Early"
    });
    var daily = new Group({
        name: "Daily"
    });
    var evening = new Group({
        name: "Evening"
    });

    var module1 = new Module({
    title: "Lesson 1: Preaparing our environment",
        description: "Just do it!",
        
    });
    var module2 = new Module({
    title: "Lesson 2: Finishing preaparing our environment",
        description: "Just do it again!",
        
    });

    module1.save();
    module2.save();
    ui.save();
    java.save();
    design.save();
    net.save();
    early.save();
    daily.save();
    evening.save();
  // create a sample user
  var course = new Course({ 
    name: 'Java',
    description: "Some very big description again, isn't",
    startAt: new Date(),
    endAt: new Date("2015-12-15 22:00:00"),
    duration: 2,
    schedule: ["Пн, Вт, Пт"],
    minStudents: 12,
    applicantsNumber: 2,
    image: "img/java.png",
    _area: java._id,
    _groups: [early._id, evening._id],
    _modules: [module1._id, module2._id]
  });  

  // save the sample user
  course.save(function(err) {
    if (err) throw err;
    module1._course = course._id;
    module2._course = course._id;
    console.log('Course saved successfully');
    module1.save();
    module2.save();
    res.json({ success: true });
  });
});

module.exports = router;