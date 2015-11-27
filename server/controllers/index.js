var express = require('express'),
    router = express.Router();

router.use('/courses', require('./courses'));
router.use('/courses/:courseId/modules', require('./modules'));
router.use('/courses/:courseId/modules/:moduleId/tests', require('./tests'));
router.use('/courses/:courseId/modules/:moduleId/questions', require('./questions'));
router.use('/areas', require('./areas'));
router.use('/groups', require('./groups'));
router.use('/modules', require('./modules'));
router.use('/answers', require('./answers'));
router.use('/vacancies', require('./vacancies'));
router.use('/menus', require('./menus'));
router.use('/upload', require('./uploads'));

router.use( "/users", require( "./users" ) );

module.exports = router;