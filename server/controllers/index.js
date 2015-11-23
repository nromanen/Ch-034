var express = require('express'),
    router = express.Router();

    router.use('/courses', require('./courses'));
    router.use('/courses/:courseId/modules', require('./modules'));
    router.use('/areas', require('./areas'));
    router.use('/groups', require('./groups'));
    router.use('/modules', require('./modules'));
    router.use('/courses/:courseId/modules/:moduleId/tests', require('./tests'));
    router.use('/courses/:courseId/modules/:moduleId/questions', require('./questions'));
    router.use('/vacancies', require('./vacancies'));

module.exports = router;