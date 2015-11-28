module.exports = {
    "secret": "ssita2015secret",
    "database": "mongodb://localhost:27017/crsms",
    "port": process.env.PORT || 8888,
    "userRole": {
      "student": 0,
      "teacher": 1,
      "admin": 2
    }
}