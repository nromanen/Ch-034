var express = require( "express" ),
    router = express.Router();

router.use( "/login", require( "./login" ) );
router.use( "/users", require( "./users" ) );
router.use( "/signup", require( "./signup" ) );

module.exports = router;