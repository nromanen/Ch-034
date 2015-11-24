module.exports = function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, app.get('superSecret'), function(err, decoded) {

      if (err) {

        return res.status( 409 ).send({ 
          success: false, 
          message: 'Failed to authenticate token.' 
        });

      } else {

        req.decoded = decoded;
        next();

      }
    });

  } else {
    
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
};