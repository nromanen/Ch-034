var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("../models/user"),
    UserProfile = require("../models/profile"),
    Course = require("../models/course"),
    Test = require("../models/test"),
    Question = require("../models/question"),
    Area = require("../models/area"),
    Group = require("../models/group"),
    Module = require("../models/module"),
    Menu = require("../models/menu"),
    MenuLink = require("../models/menuLink"),
    Resource = require("../models/resource");

router.get("/", function(req, res) {
    var mainMenu = new Menu({
        title: "Меню",
        slug: "main_menu"
    });
    var profileMenu = new Menu({
        title: "Профайл",
        slug: "profile_menu"
    });
    var coursesMenu = new Menu({
        title: "Курси",
        slug: "courses_menu"
    });
    var testsMenu = new Menu({
        title: "Тести",
        slug: "tests_menu"
    });
    var listsMenu = new Menu({
        title: "Списки",
        slug: "lists_menu"
    });
    var menusMenu = new Menu({
        title: "Меню",
        slug: "menus_menu"
    });
    var usersMenu = new Menu({
        title: "Користувачі",
        slug: "users_menu"
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
        url: "#management/courses(/)"
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
        url: "#management/tests(/)"
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
        url: "#management/areas(/)"
    });
    var listsMenuLink2 = new MenuLink({
        name: "Типи груп",
        published: true,
        access: [2],
        url: "#management/groups(/)"
    });
    var menusMenuLink1 = new MenuLink({
        name: "Список меню",
        published: true,
        access: [2],
        url: "#management/menus(/)"
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
        url: "#management/users(/)"
    });
    var usersMenuLink2 = new MenuLink({
        name: "Додати користувача",
        published: true,
        access: [2],
        url: "#management/users/new"
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

    var user1 = new User({
        "email": "buispr@gmail.com",
        "name": "Sergiy",
        "surname": "Diak",
        "password": "Diak540910",
        "role": 1
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
        name: "Рання"
    });
    var daily = new Group({
        name: "Денна"
    });
    var evening = new Group({
        name: "Вечірня"
    });

    early.save();
    daily.save();
    evening.save();

    var question1 = new Question({
        num: 1,
        name: "Введіть класичний варіант написання тегу",
        typeVariant: 0,
        variants: {
            variant1: ["&lt;name&gt;&lt;/name&gt;", true],
            variant2: ["other variant", false]
        }
    });

    var question2 = new Question({
        num: 2,
        name: "Введіть doctype HTML5 без &lt;&gt;",
        typeVariant: 1,
        answer: "DOCTYPE html"
    });

    var question3 = new Question({
        num: 3,
        name: "Відмітьте теги, які не підтримуються HTML 4.0",
        typeVariant: 2,
        variants: {
            variant1: ["header", true],
            variant2: ["img", false],
            variant3: ["footer", true],
            variant4: ["span", false]
        }
    });

    var question4 = new Question({
        num: 4,
        name: "Яка форма запису є коректною ? (два варіанти)",
        typeVariant: 2,
        variants: {
            variant1: ["&lt;input required=on&gt;", false],
            variant2: ["&lt;input required=yes&gt;", false],
            variant3: ["&lt;input required&gt;", true],
            variant4: ["&lt;input required=required&gt;", true]
        }
    });

    var question5 = new Question({
        num: 5,
        name: "Як встановити кодировку документа?",
        typeVariant: 0,
        variants: {
            variant1: ["&lt;body charset=&#34;utf-8&#34;&gt;", false],
            variant2: ["&lt;meta charset=&#34;utf-8&#34;&gt;", true],
            variant3: ["&lt;meta codebase=&#34;utf-8&#34;&gt;", false]
        }
    });

    var question6 = new Question({
        num: 6,
        name: "Який елемент у секції &lt;head&gt; є обов'язковим?",
        typeVariant: 0,
        variants: {
            variant1: ["&lt;meta&gt;", true],
            variant2: ["&lt;link&gt;", false],
            variant3: ["&lt;style&gt;", false],
            variant4: ["&lt;base&gt;", false],
            variant5: ["&lt;title&gt;", false]
        }
    });

    var question7 = new Question({
        num: 1,
        name: "Який тег не є тегом форматування таблиці?",
        typeVariant: 0,
        variants: {
            variant1: ["&lt;target&gt;", false],
            variant2: ["&lt;td&gt;", true],
            variant3: ["&lt;hd&gt;", false],
            variant4: ["&lt;colspan&gt;", true]
        }
    });

    var question8 = new Question({
        num: 2,
        name: "Який тег потрібен для організації назви таблиці?",
        typeVariant: 1,
        answer: "&lt;thead>&gt;"
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
        num: 1,
        name: "Теги: поняття, типи, підтримка"
    });
    var test2 = new Test({
        num: 2,
        name: "Форми"
    });
    var test3 = new Test({
        num: 3,
        name: "Таблиці"
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
        schedule: ["Пн, Вт, Пт"],
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
        schedule: ["Пн, Вт, Пт"],
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
        schedule: ["Пн, Вт, Пт"],
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
        schedule: ["Пн, Вт, Пт"],
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