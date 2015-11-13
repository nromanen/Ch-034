var express = require('express'),
    router = express.Router();

router.use('/courses', require('./courses'));
router.use('/courses/:courseId/modules', require('./modules'));
router.use('/areas', require('./areas'));
router.use('/groups', require('./groups'));
router.use('/modules', require('./modules'));
router.use('/vacancies', require('./vacancies'));
router.use('/register', require('./register'));
router.use('/setup', require('./setup'));

module.exports = router;