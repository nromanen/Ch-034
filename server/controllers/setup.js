var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    User = require('../models/user'),
    Course = require('../models/course'),
    Area = require('../models/area'),
    Group = require('../models/group'),
    Module = require('../models/module'),
    Resource = require('../models/resource'),
    Vacancy = require('../models/vacancy');

router.get('/', function(req, res) {

    var user1 = new User({
        email: "buispr@gmail.com",
        fullName: "Sergiy Diak",
        password: bcrypt.hashSync("diak540910", bcrypt.genSaltSync(10)),
        role: 1
    });
    
    user1.save();

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
    var vacancy1 = new Vacancy({
        "name": "DevOps Technology Consultant",
        "url": "https://softserve.ua/en/vacancies/open-vacancies/devops-technology-consultant/"
    });
    var vacancy2 = new Vacancy({
        "name": "Intermediate DevOps Software Engineer",
        "url": "https://softserve.ua/en/vacancies/open-vacancies/intermediate-devops-software-engineer/"
    });
    var vacancy3 = new Vacancy({
        "name": ".NET Software Engineer",
        "url": "https://softserve.ua/en/vacancies/open-vacancies/net-software-engineer/"
    });
    var vacancy4 = new Vacancy({
        "name": "C++ Software Engineer",
        "url": "https://softserve.ua/en/vacancies/open-vacancies/c-software-engineer-3/"
    });
    var vacancy5 = new Vacancy({
        "name": "Cloud Storage Software Engineer",
        "url": "https://softserve.ua/en/vacancies/open-vacancies/cloud-storage-software-engineer/"
    });
    var vacancy6 = new Vacancy({
        "name": "Delivery Director",
        "url": "https://softserve.ua/en/vacancies/open-vacancies/delivery-director/"
    });

    resource1.save();
    resource2.save();
    resource3.save();

    vacancy1.save();
    vacancy2.save();
    vacancy3.save();
    vacancy4.save();
    vacancy5.save();
    vacancy6.save();

    var course1 = new Course({ 
        name: 'Java',
        description: "Даний курс орієнтований на вивчення Java як людьми з мінімальним рівнем знання програмування так і людей, які хочуть покращити свої знання з певних нюансів мови.",
        startDate: "2015-10-06",
        duration: 4,
        schedule: ["Пн, Вт, Пт"],
        minStudents: 12,
        applicantsNumber: 2,
        image: "img/java.png",
        area: java,
        groups: [early, evening],
        _modules: [module1._id, module2._id]
    });  
    var course2 = new Course({ 
        name: 'Flat UI',
        description: "Даний курс вивчає мінімалістичний підхід до дизайну об'єктів, який підкреслює зручність використання, більшою мірою орієнтований на кінцевого користувача. Курс буде цікавий студентам, які хотіли б оволодіти мистецтвом розробки веб-ресурсів згідно нових тенденцій дизайну",
        startDate: "2015-9-16",
        duration: 1,
        schedule: ["Пн, Вт, Пт"],
        minStudents: 12,
        applicantsNumber: 2,
        image: "img/flat_ui.png",
        area: ui,
        groups: [early, evening],
        _modules: [module1._id, module2._id]
    });  
    var course3 = new Course({ 
        name: 'CSS',
        description: "Будуть розглянуті сучасні можливості каскадних таблиць стилів і їхню підтримку востанніх популярних браузерах",
        startDate: "2015-8-26",
        duration: 2,
        schedule: ["Пн, Вт, Пт"],
        minStudents: 12,
        applicantsNumber: 2,
        image: "img/css.png",
        area: ui,
        groups: [early, daily],
        _modules: [module1._id, module2._id]
    });  
    var course4 = new Course({ 
        name: 'HTML',
        description: "Даний курс складається з п'яти модулів та екзаменаційного завдання. Кожен модуль містить посилання на матеріали відеохарактеру та допоміжну інформацію. Курс буде цікавий студентам, які хотіли б оволодіти мистецтвом розробки веб-ресурсів згідно нових тенденцій дизайну",
        startDate: "2015-10-26",
        duration: 3,
        schedule: ["Пн, Вт, Пт"],
        minStudents: 8,
        applicantsNumber: 2,
        image: "img/html.png",
        area: ui,
        groups: [daily, evening],
        _modules: [module1._id, module2._id]
    });  
    var course5 = new Course({ 
        name: '.Net',
        description: "У Вас буде можливість вивчити технології та підходи до розробки Web-програм з багаторівневою архітектурою. Ви отримаєте досвід побудови Web-програм засобами ASP.NET MVC, Silverlight, побудови десктопних програм засобами WPF, реалізацію ORM засобами ADO.NET Entity, а також розробки Web-сервісів з допомогою WСF.",
        startDate: "2015-10-01",
        duration: 6,
        schedule: ["Пн, Вт, Пт"],
        minStudents: 12,
        applicantsNumber: 2,
        image: "img/_net.png",
        area: net,
        groups: [early, evening],
        _modules: [module1._id, module2._id]
    });  


    course1.save(function(err) {
        if (err) throw err;
        module1._course = course1._id;
        module2._course = course1._id;
        module1._resources.push(resource1._id);
        module1._resources.push(resource2._id);
        module1._resources.push(resource3._id);
        module2._resources.push(resource1._id);
        module1.save();
        module2.save();
        console.log('Course saved successfully');
        
    });
    course2.save(function(err) {
        if (err) throw err;
        console.log('Course saved successfully');
        
    });
    course3.save(function(err) {
        if (err) throw err;
        console.log('Course saved successfully');
        
    });
    course4.save(function(err) {
        if (err) throw err;
        console.log('Course saved successfully');
        
    });
    course5.save(function(err) {
        if (err) throw err;
        console.log('Course saved successfully');
        
    });
    res.json({ success: true });
});

module.exports = router;