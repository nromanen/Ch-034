var express = require("express"),
    fs = require("fs"),
    logger = require("morgan"),
    app = express(),
    router = express.Router();

router.use(logger("tiny", {
    stream: fs.createWriteStream("./server/log.log", {flags: "a"})
}));

router.use("/courses", require("./courses"));
router.use("/courses/:courseId/modules", require("./modules"));
router.use("/courses/:courseId/modules/:moduleId/tests", require("./tests"));
router.use("/modules/:moduleId/tests", require("./tests"));
router.use("/courses/:courseId/modules/:moduleId/questions", require("./questions"));
router.use("/areas", require("./areas"));
router.use("/groups", require("./groups"));
router.use("/modules", require("./modules"));
router.use("/tests", require("./tests"));
router.use("/answers", require("./answers"));
router.use("/vacancies", require("./vacancies"));
router.use("/menus", require("./menus"));
router.use("/resources", require("./resources"));
router.use('/upload', require('./uploads'));
router.use("/static", require("./static"));
router.use("/reset", require("./reset"));

router.use( "/users", require( "./users" ) );
router.use( "/profile", require( "./profile" ) );

module.exports = router;