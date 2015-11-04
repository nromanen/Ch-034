var express = require('express'),
    router = express.Router();

router.use('/courses', require('./courses'));
router.use('/areas', require('./areas'));
router.use('/groups', require('./groups'));
router.use('/modules', require('./modules'));
router.use('/course/:id/modules', require('./modules'));
router.use('/setup', require('./setup'));
router.use('/authenticate', require('./authenticate'));

module.exports = router;