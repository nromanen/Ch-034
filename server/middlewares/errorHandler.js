module.exports = function(err, req, res, next) {
    err.success = false;
    err.message = "Щось пішло не так."
    return res.status(500).json(err);
};