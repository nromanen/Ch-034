var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("../models/user"),
    UserProfile = require("../models/profile"),
    Course = require("../models/course"),
    Test = require("../models/test"),
    Question = require("../models/question"),
    Variant = require("../models/variant"),
    Area = require("../models/area"),
    Group = require("../models/group"),
    Module = require("../models/module"),
    Menu = require("../models/menu"),
    MenuLink = require("../models/menuLink"),
    Resource = require("../models/resource"),
    ReportForm = require("../models/reportmessage");

router.get("/", function(req, res) {
    var mainMenu = new Menu({
        name: "Меню",
        slug: "main_menu",
        isPublished: true,
        access: [0,1,2]
    });
    var profileMenu = new Menu({
        name: "Профайл",
        slug: "profile_menu",
        isPublished: true,
        access: [0,1,2]
    });
    var coursesMenu = new Menu({
        name: "Курси",
        slug: "courses_menu",
        isPublished: true,
        access: [0,1,2]
    });
    var testsMenu = new Menu({
        name: "Тести",
        slug: "tests_menu",
        isPublished: true,
        access: [0,1,2]
    });
    var listsMenu = new Menu({
        name: "Списки",
        slug: "lists_menu",
        isPublished: true,
        access: [0,1,2]
    });
    var menusMenu = new Menu({
        name: "Всі меню",
        slug: "menus_menu",
        isPublished: true,
        access: [2]
    });
    var usersMenu = new Menu({
        name: "Користувачі",
        slug: "users_menu",
        isPublished: true,
        access: [2]
    });
    var mainMenuLink1 = new MenuLink({
        name: "Всі курси",
        published: true,
        access: [0,1,2],
        url: "#courses"
    });
    var mainMenuLink2 = new MenuLink({
        name: "Мої курси",
        published: true,
        access: [0],
        url: "#my-courses"
    });
    var mainMenuLink3 = new MenuLink({
        name: "Управління",
        published: true,
        access: [1,2],
        url: "#management/areas"
    });
    var profileMenuLink1 = new MenuLink({
        name: "Мій профіль",
        published: true,
        access: [0,1,2],
        url: "#profile"
    });
    var profileMenuLink2 = new MenuLink({
        name: "Вихід",
        published: true,
        access: [0,1,2],
        url: "#logout"
    });
    var coursesMenuLink1 = new MenuLink({
        name: "Список курсів",
        published: true,
        access: [1,2],
        url: "#management/courses"
    });
    var coursesMenuLink2 = new MenuLink({
        name: "Додати курс",
        published: true,
        access: [1,2],
        url: "#management/courses/new"
    });
    var testsMenuLink1 = new MenuLink({
        name: "Список тестів",
        published: true,
        access: [1,2],
        url: "#management/tests"
    });
    var testsMenuLink2 = new MenuLink({
        name: "Додати тест",
        published: true,
        access: [1,2],
        url: "#management/tests/new"
    });
    var listsMenuLink1 = new MenuLink({
        name: "Напрямки",
        published: true,
        access: [2],
        url: "#management/areas"
    });
    var listsMenuLink2 = new MenuLink({
        name: "Типи груп",
        published: true,
        access: [2],
        url: "#management/groups"
    });
    var menusMenuLink1 = new MenuLink({
        name: "Список меню",
        published: true,
        access: [2],
        url: "#management/menus"
    });
    var menusMenuLink2 = new MenuLink({
        name: "Додати меню",
        published: true,
        access: [2],
        url: "#management/menus/new"
    });
    var usersMenuLink1 = new MenuLink({
        name: "Список користувачів",
        published: true,
        access: [2],
        url: "#management/users"
    });
    var usersMenuLink2 = new MenuLink({
        name: "Додати користувача",
        published: true,
        access: [2],
        url: "#management/users/new"
    });
    var ReportForm2 = new ReportForm({
        email: "test@te.tes",
        name: "",
        text: ""
    });
    mainMenuLink1.save();
    mainMenuLink2.save();
    mainMenuLink3.save();
    profileMenuLink1.save();
    profileMenuLink2.save();
    coursesMenuLink1.save();
    coursesMenuLink2.save();
    testsMenuLink1.save();
    testsMenuLink2.save();
    listsMenuLink1.save();
    listsMenuLink2.save();
    menusMenuLink1.save();
    menusMenuLink2.save();
    usersMenuLink1.save();
    usersMenuLink2.save();
    ReportForm2.save();

    var user1 = new User({
        "email": "buispr@gmail.com",
        "name": "Sergiy",
        "surname": "Diak",
        "password": "Diak540910",
        "isConfirmed": true,
        "role": 2
    });
    
    var profile = new UserProfile({
        email: user1.email,
        name: user1.name,
        surname: user1.surname,
        avatar: "",
        social: {
            phone: "req.body.phone",
            skype: "req.body.skype",
            linkedin: "req.body.linkedin",
            fb: "req.body.fb",
            vk: "req.body.vk"
        },
    });
    user1._profile = profile;
    profile._user = user1;

    user1.save();
    profile.save();
    var ui = new Area({
        name: "UI",
        order: 1
    });
    var java = new Area({
        name: "Java",
        order: 2
    });
    var design = new Area({
        name: "Design",
        order: 3
    });
    var net = new Area({
        name: ".Net",
        order: 4
    });

    ui.save();
    java.save();
    design.save();
    net.save();

    var early = new Group({
        name: "Рання",
        order: 1
    });
    var daily = new Group({
        name: "Денна",
        order: 2
    });
    var evening = new Group({
        name: "Вечірня",
        order: 3
    });

    early.save();
    daily.save();
    evening.save();

    var variant11 = new Variant({
        num: 1,
        name: "&lt;name&gt;&lt;/name&gt;",
        isCorrect: true
    });
    var variant12 = new Variant({
        num: 2,
        name: "other variant",
        isCorrect: false
    });
    var variant2 = new Variant({
        num: 0,
        name: "DOCTYPE html",
        isCorrect: true
    });
    var variant31 = new Variant({
        num: 1,
        name: "header",
        isCorrect: true
    });
        var variant32 = new Variant({
        num: 2,
        name: "img",
        isCorrect: false
    });
        var variant33 = new Variant({
        num: 3,
        name: "footer",
        isCorrect: true
    });
    var variant34 = new Variant({
        num: 4,
        name: "span",
        isCorrect: false
    });

    var variant41 = new Variant({
        num: 1,
        name: "&lt;input required=on&gt;",
        isCorrect: false
    });
        var variant42 = new Variant({
        num: 2,
        name: "&lt;input required=yes&gt;",
        isCorrect: false
    });
        var variant43 = new Variant({
        num: 3,
        name: "&lt;input required&gt;",
        isCorrect: true
    });
    var variant44 = new Variant({
        num: 4,
        name: "&lt;input required=required&gt;",
        isCorrect: true
    });
    var variant51 = new Variant({
        num: 1,
        name: "&lt;body charset=&#34;utf-8&#34;&gt;",
        isCorrect: false
    });
    var variant52 = new Variant({
        num: 2,
        name: "&lt;meta charset=&#34;utf-8&#34;&gt;",
        isCorrect: true
    });
    var variant53 = new Variant({
        num: 3,
        name: "&lt;meta codebase=&#34;utf-8&#34;&gt;",
        isCorrect: false
    });
    var variant61 = new Variant({
        num: 1,
        name: "&lt;meta&gt;",
        isCorrect: true
    });
    var variant62 = new Variant({
        num: 2,
        name: "&lt;link&gt;",
        isCorrect: false
    });
    var variant63 = new Variant({
        num: 3,
        name: "&lt;style&gt;",
        isCorrect: false
    });
    var variant64 = new Variant({
        num: 4,
        name: "&lt;base&gt;",
        isCorrect: false
    });
    var variant65 = new Variant({
        num: 5,
        name: "&lt;title&gt;",
        isCorrect: false
    });
    var variant71 = new Variant({
        num: 1,
        name: "&lt;target&gt;",
        isCorrect: false
    });
    var variant72 = new Variant({
        num: 2,
        name: "&lt;td&gt;",
        isCorrect: true
    });
    var variant73 = new Variant({
        num: 3,
        name: "&lt;hd&gt;",
        isCorrect: false
    });
    var variant74 = new Variant({
        num: 4,
        name: "&lt;colspan&gt;",
        isCorrect: true
    });
    var variant8 = new Variant({
        num: 0,
        name: "&lt;thead>&gt;",
        isCorrect: true
    });

    variant11.save();
    variant12.save();
    variant2.save();
    variant31.save();
    variant32.save();
    variant33.save();
    variant34.save();
    variant41.save();
    variant42.save();
    variant43.save();
    variant44.save();
    variant51.save();
    variant52.save();
    variant53.save();
    variant61.save();
    variant62.save();
    variant63.save();
    variant64.save();
    variant65.save();
    variant71.save();
    variant72.save();
    variant73.save();
    variant74.save();
    variant8.save();

    var question1 = new Question({
        num: 1,
        name: "Введіть класичний варіант написання тегу",
        typeVariant: 0,
        _variants: [variant11._id, variant12._id]
    });

    var question2 = new Question({
        num: 2,
        name: "Введіть doctype HTML5 без &lt;&gt;",
        typeVariant: 1,
        _variants: [variant2._id]
    });

    var question3 = new Question({
        num: 3,
        name: "Відмітьте теги, які не підтримуються HTML 4.0",
        typeVariant: 2,
        _variants: [variant31._id, variant32._id, variant33._id, variant34._id]
    });

    var question4 = new Question({
        num: 4,
        name: "Яка форма запису є коректною ? (два варіанти)",
        typeVariant: 2,
         _variants: [variant41._id, variant42._id, variant43._id, variant44._id]
    });

    var question5 = new Question({
        num: 5,
        name: "Як встановити кодировку документа?",
        typeVariant: 0,
         _variants: [variant51._id, variant52._id, variant53._id]
    });

    var question6 = new Question({
        num: 6,
        name: "Який елемент у секції &lt;head&gt; є обов'язковим?",
        typeVariant: 0,
         _variants: [variant61._id, variant62._id, variant63._id, variant64._id, variant65._id]
    });

    var question7 = new Question({
        num: 1,
        name: "Який тег не є тегом форматування таблиці?",
        typeVariant: 0,
        _variants: [variant71._id, variant72._id, variant73._id, variant74._id]
    });

    var question8 = new Question({
        num: 2,
        name: "Який тег потрібен для організації назви таблиці?",
        typeVariant: 1,
        _variants: [variant8._id]
    });

    question1.save(function(err) {
        if (err) throw err;
        variant11._question = question1._id;
        variant12._question = question1._id;
        variant11.save();
        variant12.save();
    });
    question2.save(function(err) {
        if (err) throw err;
        variant2._question = question2._id;
        variant2.save();
    });
    question3.save(function(err) {
        if (err) throw err;
        variant31._question = question3._id;
        variant32._question = question3._id;
        variant33._question = question3._id;
        variant34._question = question3._id;
        variant31.save();
        variant32.save();
        variant33.save();
        variant34.save();
    });
    question4.save(function(err) {
        if (err) throw err;
        variant41._question = question4._id;
        variant42._question = question4._id;
        variant43._question = question4._id;
        variant44._question = question4._id;
        variant41.save();
        variant42.save();
        variant43.save();
        variant44.save();
    });
    question5.save(function(err) {
        if (err) throw err;
        variant51._question = question5._id;
        variant52._question = question5._id;
        variant53._question = question5._id;
        variant51.save();
        variant52.save();
        variant53.save();
    });
    question6.save(function(err) {
        if (err) throw err;
        variant61._question = question6._id;
        variant62._question = question6._id;
        variant63._question = question6._id;
        variant64._question = question6._id;
        variant65._question = question6._id;
        variant61.save();
        variant62.save();
        variant63.save();
        variant64.save();
        variant65.save();
    });
    question7.save(function(err) {
        if (err) throw err;
        variant71._question = question7._id;
        variant72._question = question7._id;
        variant73._question = question7._id;
        variant74._question = question7._id;
        variant71.save();
        variant72.save();
        variant73.save();
        variant74.save();
    });
    question8.save(function(err) {
        if (err) throw err;
        variant8._question = question8._id;
        variant8.save();
    });

    var test1 = new Test({
        num: 1,
        name: "Теги: поняття, типи, підтримка",
        estimateMethod: "simple"
    });
    var test2 = new Test({
        num: 2,
        name: "Форми",
        estimateMethod: "gravimetric"
    });
    var test3 = new Test({
        num: 3,
        name: "Таблиці",
        estimateMethod: "proportional"
    });
    var test4 = new Test({
        num: 4,
        name: "Спеціальні теги HTML 5"
    });
    var test5 = new Test({
        num: 5,
        name: "Побудова оптимізованого DOM дерева"
    });
    var test6 = new Test({
        num: 6,
        name: "Екзаменаційне завдання"
    });

    test1.save(function(err) {
        if (err) throw err;
        question1._test = test1._id;
        question2._test = test1._id;
        question3._test = test1._id;
        question4._test = test1._id;
        question5._test = test1._id;
        question6._test = test1._id;
        question1.save();
        question2.save();
        question3.save();
        question4.save();
        question5.save();
        question6.save();
    });
    test2.save();
    test3.save(function(err) {
        if (err) throw err;
        question7._test = test3._id;
        question8._test = test3._id;
        question7.save();
        question8.save();
    });
    test4.save();
    test5.save();
    test6.save();

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

    var module1 = new Module({
        name: "Модуль 1. Встановлення і налаштування середовища",
        description: "Just do it again!",
        available: true
    });
    var module2 = new Module({
        name: "Модуль 2. Вступ в класи та методи",
        description: "Just do it again!",
        available: true,
        result: 7,
        numberOfTests: 8
    });
    var module3 = new Module({
        name: "Модуль 3. Керування порядком виконання",
        description: "Just do it again!",
    });
    var module11 = new Module({
        name: "Модуль 1.Теги: поняття, типи, підтримка",
        description: "\"Теги\"? Теги це мітки, які ви використовуєте для вказівки браузеру, як він повинен показувати ваш web-сайт. Всі теги мають однаковий формат: вони починаються знаком \"&lt;\" і закінчуються знаком sign \"&gt;\". Зазвичай є два теги - відкриваючий: &lt;html&gt; і закриваючий: &lt;/html&gt;. Різниця в тому, що в закриваючому є слеш \"/\". Весь вміст, що вміщено між відкриваючими і закриваючими тегами, є вмістом тега. Але, як то кажуть, в кожному правилі є винятки, і в HTML також є теги, які є і відкривають, і закривають. Ці теги не містять тексту, а є мітками, наприклад, перенесення рядка виглядає так: &lt;br />. HTML - це теги, і нічого крім тегів. Для вивчення HTML потрібно вивчити різні теги. Наприклад, тег &lt;b&gt; інформує браузер, що весь текст між &lt;b&gt; і &lt;/b&gt; повинен бути надрукований жирним шрифтом. (\"b\" це скорочення від \"bold\".)",
        available: true,
        _tests: [test1._id],
        _resources: [resource1._id]
    });

    var module12 = new Module({
        name: "Модуль 2. Форми",
        description: "Форма в мережі є будь-якою областю на сторінці Web, де можна ввести інформацію, наприклад, введення тексту або чисел у текстовому полі, постановка прапорця, встановлення радіо-кнопки або вибір варіанта зі списку. Потім форма, після натискання на кнопку відправки, надсилається на Web-сайт. Використання форм в Web зустрічається повсюдно: для введення імен користувачів і паролів на екрані реєстрації, коментарі в блозі, заповнення профілю на сайті соціальної мережі або повідомлення інформації для рахунку на сайті магазина. Створити форму легко, але як щодо відповідності форми стандартам Web? До даного моменту, якщо ви пропрацювали навчальний курс за стандартами Web, будемо сподіватися, що ви вже переконалися, що стандарти Web є способом руху вперед. Код, який необхідно створити для доступної форми відповідно до стандартів, вимагає не більше роботи для реалізації, ніж неохайна форма.Тому, давайте почнемо з самої основної та простої форми, яку хтось, можливо, захоче використати, і після цього потроху будемо її ускладнювати – у цій лекції будуть розглянуті всі основні елементи, які необхідно знати для створення елегантної, доступної форми з допомогою HTML.",
        available: true,
        result: 7,
        numberOfTests: 8,
        _tests: [test2._id],
        _resources: [resource2._id]
    });

    var module13 = new Module({
        name: "Модуль 3. Таблиці",
        description: "Як використовувати стандарти Web для організації безлічі даних? Сама ідея множини вкладених елементів, необхідних для перетворення всіх даних в симпатичні рядки та клітинки, повинна привести мозок у стан тривоги, але на щастя рішення є – на допомогу приходять таблиці! <br /> У Web-дизайні таблиці є хорошим способом організації даних в табличній формі. Іншими словами, завдяки таблицям, діаграмам та іншій графічній інформації, яка допомагає побачити і перетворити великий обсяг інформації в зведення, яке дозволяє порівнювати і зіставляти різні фрагменти даних. Ви зустрічаєте їх постійно на Web-сайтах, де вони представляють підсумки порівняння результатів політичних виборів, спортивної статистики, порівняння цін, таблиці розмірів, або інші дані. <br /> Раніше, в доісторичні часи Інтернет, перш ніж CSS став популярний як засіб поділу подання та структури HTML, таблиці використовувалися як засіб компонування Web-сторінок – для створення стовпців, боксів і загальної організації контенту. Це неправильний спосіб вирішення цих питань; використання таблиць для компонування призводить до громіздких, безладних сторінок з безліччю вкладених одна в одну таблиць – тобто великі розміри файлів, труднощі з обслуговуванням, труднощі з модифікацією після створення. Можна до цього часу бачити в Web такі сайти, але сьогодні необхідно використовувати таблиці тільки для того,для чого вони призначені – табличних даних – і використовувати CSS для управління компоновкою.<br /> Тут ми розглянемо, як правильно використовувати таблиці HTML – стаття має наступну структуру: <ul><li>Найбільша загальна таблиця</li><li>Додавання деяких властивостей</li><li>Додаткова структуризація таблиці</li><li>Допомога CSS: поліпшення вигляду таблиці</li></ul>",
        _tests: [test3._id],
        _resources: [resource3._id]
    });

    module1.save();
    module2.save();
    module3.save();
    module11.save(function(err) {
        if (err) throw err;
        test1._module = module11._id;
        test1.save();
        question1._module = module11._id;
        question2._module = module11._id;
        question3._module = module11._id;
        question4._module = module11._id;
        question5._module = module11._id;
        question6._module = module11._id;
        question1.save();
        question2.save();
        question3.save();
        question4.save();
        question5.save();
        question6.save();
        resource1._module = module11._id;
        resource1.save();
    });
    module12.save(function(err) {
        if (err) throw err;
        test2._module = module12._id;
        test2.save();
        resource2._module = module12._id;
        resource2.save();
    });
    module13.save(function(err) {
        if (err) throw err;
        test3._module = module13._id;
        test3.save();
        question7._module = module13._id;
        question8._module = module13._id;
        question7.save();
        question8.save();
        resource3._module = module13._id;
        resource3.save();
    });

    var unpublish_date = new Date();
    unpublish_date.setDate(unpublish_date.getDate()-3);

    var course1 = new Course({ 
        name: "HTML",
        description: "Даний курс складається з п'яти модулів та екзаменаційного завдання. Кожен модуль містить посилання на матеріали відеохарактеру та допоміжну інформацію. Курс буде цікавий студентам, які хотіли б оволодіти мистецтвом розробки веб-ресурсів згідно нових тенденцій дизайну",
        startDate: "2015-10-06",
        duration: 4,
        schedule: ["Пн", "Вт", "Пт"],
        minStudents: 12,
        applicantsNumber: 2,
        image: "img/html.png",
        area: ui,
        groups: [early, evening],
        _modules: [module11._id, module12._id, module13._id]
    });  
    var course2 = new Course({ 
        name: "Flat UI",
        description: "Даний курс вивчає мінімалістичний підхід до дизайну об'єктів, який підкреслює зручність використання, більшою мірою орієнтований на кінцевого користувача. Курс буде цікавий студентам, які хотіли б оволодіти мистецтвом розробки веб-ресурсів згідно нових тенденцій дизайну",
        startDate: "2015-9-16",
        isPublished: false,
        duration: 1,
        schedule: ["Пн", "Вт", "Пт"],
        minStudents: 12,
        applicantsNumber: 2,
        image: "img/flat_ui.png",
        area: ui,
        groups: [early, evening],
        _modules: [module1._id, module2._id]
    });
    
    var course3 = new Course({ 
        name: "CSS",
        description: "Будуть розглянуті сучасні можливості каскадних таблиць стилів і їхню підтримку востанніх популярних браузерах",
        startDate: "2015-8-26",
        unpublish_at: unpublish_date,
        duration: 2,
        schedule: ["Пн", "Вт", "Пт"],
        minStudents: 12,
        applicantsNumber: 2,
        image: "img/css.png",
        area: ui,
        groups: [early, daily],
        _modules: [module1._id, module2._id]
    });  
    var course4 = new Course({ 
        name: "JAVA",
        description: "Даний курс складається з п'яти модулів та екзаменаційного завдання. Кожен модуль містить посилання на матеріали відеохарактеру та допоміжну інформацію. Курс буде цікавий студентам, які хотіли б оволодіти мистецтвом розробки веб-ресурсів згідно нових тенденцій дизайну",
        startDate: "2015-10-26",
        duration: 3,
        schedule: ["Пн", "Вт", "Пт"],
        minStudents: 8,
        applicantsNumber: 2,
        image: "img/java.png",
        area: java,
        groups: [daily, evening],
        _modules: [module1._id, module2._id]
    });  
    var course5 = new Course({ 
        name: ".Net",
        description: "У Вас буде можливість вивчити технології та підходи до розробки Web-програм з багаторівневою архітектурою. Ви отримаєте досвід побудови Web-програм засобами AStest1.NET MVC, Silverlight, побудови десктопних програм засобами WPF, реалізацію ORM засобами ADO.NET Entity, а також розробки Web-сервісів з допомогою WСF.",
        startDate: "2015-10-01",
        duration: 6,
        schedule: ["Пн", "Вт", "Пт"],
        minStudents: 12,
        applicantsNumber: 2,
        image: "img/_net.png",
        area: net,
        groups: [early, evening],
        _modules: [module1._id, module2._id]
    });  

    course1.save(function(err) {
        if (err) throw err;
        module11._course = course1._id;
        module12._course = course1._id;
        module13._course = course1._id;
        test1._course = course1._id;
        test2._course = course1._id;
        test3._course = course1._id;
        test4._course = course1._id;
        test5._course = course1._id;
        test6._course = course1._id;
        question1._course = course1._id;
        question2._course = course1._id;
        question3._course = course1._id;
        question4._course = course1._id;
        question5._course = course1._id;
        question6._course = course1._id;
        question7._course = course1._id;
        question8._course = course1._id;
        module11.save();
        module12.save();
        module13.save();
        test1.save();
        test2.save();
        test3.save();
        test4.save();
        test5.save();
        test6.save();
        question1.save();
        question2.save();
        question3.save();
        question4.save();
        question5.save();
        question6.save();
        question7.save();
        question8.save();
    });
    course2.save(function(err) {
        if (err) throw err;
    });
    course3.save(function(err) {
        if (err) throw err;
    });
    course4.save(function(err) {
        if (err) throw err;
        module1._course = course4._id;
        module2._course = course4._id;
        module3._course = course4._id;
        module1.save();
        module2.save();
        module3.save();
    });
    course5.save(function(err) {
        if (err) throw err;
    }); 

    mainMenu._menuLinks.push(mainMenuLink1._id, mainMenuLink2._id, mainMenuLink3._id);
    profileMenu._menuLinks.push(profileMenuLink1._id, profileMenuLink2._id);
    coursesMenu._menuLinks.push(coursesMenuLink1._id, coursesMenuLink2._id);
    testsMenu._menuLinks.push(testsMenuLink1._id, testsMenuLink2._id);
    listsMenu._menuLinks.push(listsMenuLink1._id, listsMenuLink2._id);
    menusMenu._menuLinks.push(menusMenuLink1._id, menusMenuLink2._id);
    usersMenu._menuLinks.push(usersMenuLink1._id, usersMenuLink2._id);
    mainMenu.save();
    profileMenu.save();
    coursesMenu.save();
    testsMenu.save();
    listsMenu.save();
    menusMenu.save();
    usersMenu.save();

    res.json({ success: true });
});

module.exports = router;