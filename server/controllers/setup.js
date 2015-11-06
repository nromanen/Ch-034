var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Course = require('../models/course'),
    Area = require('../models/area'),
    Group = require('../models/group'),
    Module = require('../models/module'),
    Resource = require('../models/resource');

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

    ui.save();
    java.save();
    design.save();
    net.save();

    var early = new Group({
        name: "Early"
    });
    var daily = new Group({
        name: "Daily"
    });
    var evening = new Group({
        name: "Evening"
    });

    early.save();
    daily.save();
    evening.save();

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

    var resource1 = new Resource({
        type: "video",
        name: "Модуль 1. Відео.",
        url: "https://www.youtube.com/embed/LICSA6iJd6w",
    });    
    var resource2 = new Resource({
        type: "zip",
        name: "Модуль 1. Конспект. Частина 1.",
        url: "/web-resources/forms.zip",
    });
    var resource3 = new Resource({
        type: "zip",
        name: "Модуль 1. Конспект. Частина 2.",
        url: "/web-resources/forms.zip",
    });

    resource1.save();
    resource2.save();
    resource3.save();

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
        area: java,
        groups: [early, evening],
        _modules: [module1._id, module2._id]
    });  

  // save the sample user
    course.save(function(err) {
        if (err) throw err;
        module1._course = course._id;
        module2._course = course._id;
        module1._resources.push(resource1._id);
        module1._resources.push(resource2._id);
        module1._resources.push(resource3._id);
        module2._resources.push(resource1._id);
        module1.save();
        module2.save();
        console.log('Course saved successfully');
        res.json({ success: true });
    });
});

module.exports = router;