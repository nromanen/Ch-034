var express = require('express'),
    router = express.Router();

<<<<<<< HEAD
router.use('/courses', require('./courses'));
router.use('/courses/:courseId/modules', require('./modules'));
router.use('/areas', require('./areas'));
router.use('/groups', require('./groups'));
router.use('/vacancies', require('./vacancies'));
router.use('/menus', require('./menus'));

router.use( "/users", require( "./users" ) );

module.exports = router;