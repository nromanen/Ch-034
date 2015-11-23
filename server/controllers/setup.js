var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require('../models/user'),
    Course = require('../models/course'),
    Test = require('../models/test'),
    Question = require('../models/question'),
    Area = require('../models/area'),
    Group = require('../models/group'),
    Module = require('../models/module'),
    Resource = require('../models/resource'),
    Vacancy = require('../models/vacancy');

router.get('/', function(req, res) {

    var user1 = new User({
        email: "buispr@gmail.com",
        fullName: "Sergiy Diak",
        password: "Diak540910",
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

    var question1 = new Question({
        "num": 1,
        "question": "Введіть класичний варіант написання тегу",
        "typeVariant": 0,
        "variants": {
            "variant1": "&lt;name&gt;&lt;/name&gt;",
            "variant2": "other variant"
        }
    });

    var question2 = new Question({
        "num": 2,
        "question": "Введіть doctype HTML5 без &lt;&gt;",
        "typeVariant": 1
    });

    var question3 = new Question({
        "num": 3,
        "question": "Відмітьте теги, які не підтримуються HTML 4.0",
        "typeVariant": 2,
        "variants": {
            "variant1": "header",
            "variant2": "img",
            "variant3": "footer",
            "variant4": "span"
        }
    });

    var question4 = new Question({
        "num": 4,
        "question": "Яка форма запису є коректною ? (два варіанти)",
        "typeVariant": 2,
        "variants": {
            "variant1": "&lt;input required=on&gt;",
            "variant2": "&lt;input required=yes&gt;",
            "variant3": "&lt;input required&gt;",
            "variant4": "&lt;input required=required&gt;"
        }
    });

    var question5 = new Question({
        "num": 5,
        "question": "Як встановити кодировку документа?",
        "typeVariant": 0,
        "variants": {
            "variant1": "&lt;body charset=&#34;utf-8&#34;&gt;",
            "variant2": "&lt;meta charset=&#34;utf-8&#34;&gt;",
            "variant3": "&lt;meta codebase=&#34;utf-8&#34;&gt;"
        }
    });

    var question6 = new Question({
        "num": 6,
        "question": "Який елемент у секції &lt;head&gt; є обов'язковим?",
        "typeVariant": 0,
        "variants": {
            "variant1": "&lt;meta&gt;",
            "variant2": "&lt;link&gt;",
            "variant3": "&lt;style&gt;",
            "variant4": "&lt;base&gt;",
            "variant5": "&lt;title&gt;"
        }
    });

    var question7 = new Question({
        "num": 1,
        "question": "Який тег не є тегом форматування таблиці?",
        "typeVariant": 0,
        "variants": {
            "variant1": "&lt;target&gt;",
            "variant2": "&lt;td&gt;",
            "variant3": "&lt;hd&gt;",
            "variant4": "&lt;colspan&gt;"
        }
    });

    var question8 = new Question({
        "num": 2,
        "question": "Який тег потрібен для організації назви таблиці?",
        "typeVariant": 1
    });

    question1.save();
    question2.save();
    question3.save();
    question4.save();
    question5.save();
    question6.save();
    question7.save();
    question8.save();

    var test1 = new Test({
        "num": 1,
        "nameTest": "Теги: поняття, типи, підтримка"
    });
    var test2 = new Test({
        "num": 2,
        "nameTest": " Форми"
    });
    var test3 = new Test({
        "num": 3,
        "nameTest": " Таблиці"
    });
    var test4 = new Test({
        "num": 4,
        "nameTest": "Спеціальні теги HTML 5"
    });
    var test5 = new Test({
        "num": 5,
        "nameTest": "Побудова оптимізованого DOM дерева"
    });
    var test6 = new Test({
        "num": 6,
        "nameTest": "Екзаменаційне завдання"
    });

    test1.save();
    test2.save();
    test3.save();
    test4.save();
    test5.save();
    test6.save();

    var module1 = new Module({
        title: "Lesson 1: Preaparing our environment",
        description: "Just do it!",
    });
    var module2 = new Module({
        title: "Lesson 2: Finishing preaparing our environment",
        description: "Just do it again!",
    });
    var module41 = new Module({
        title: "Модуль 1.Теги: поняття, типи, підтримка",
        description: "Just do it again!",
        _tests: [test1._id]
    });

    var module42 = new Module({
        title: "Модуль 2. Форми",
        description: "Just do it again!",
        _tests: [test2._id]
    });

    var module43 = new Module({
        title: "Модуль 3. Таблиці",
        description: "Just do it again!",
        _tests: [test3._id]
    });

    module1.save();
    module2.save();
    module41.save(function(err) {
        if (err) throw err;
        test1._module = module41._id;
        test1.save();
        question1._module = module41._id;
        question2._module = module41._id;
        question3._module = module41._id;
        question4._module = module41._id;
        question5._module = module41._id;
        question6._module = module41._id;
        question1.save();
        question2.save();
        question3.save();
        question4.save();
        question5.save();
        question6.save();
        console.log('Module saved successfully');
    });
    module42.save(function(err) {
        if (err) throw err;
        test2._module = module42._id;
        test2.save();
        console.log('Module saved successfully');
    });
    module43.save(function(err) {
        if (err) throw err;
        test3._module = module43._id;
        test3.save();
        question7._module = module43._id;
        question8._module = module43._id;
        question7.save();
        question8.save();
        console.log('Module saved successfully');
    });

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
        _modules: [module41._id, module42._id, module43._id]
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
        test1._course = course4._id;
        test2._course = course4._id;
        test3._course = course4._id;
        test4._course = course4._id;
        test5._course = course4._id;
        test6._course = course4._id;
        test1.save();
        test2.save();
        test3.save();
        test4.save();
        test5.save();
        test6.save();
        question1._course = course4._id;
        question2._course = course4._id;
        question3._course = course4._id;
        question4._course = course4._id;
        question5._course = course4._id;
        question6._course = course4._id;
        question7._course = course4._id;
        question8._course = course4._id;
        question1.save();
        question2.save();
        question3.save();
        question4.save();
        question5.save();
        question6.save();
        question7.save();
        question8.save();
        console.log('Course saved successfully');
        
    });
    course5.save(function(err) {
        if (err) throw err;
        console.log('Course saved successfully');
        
    });
    res.json({ success: true });
});

module.exports = router;