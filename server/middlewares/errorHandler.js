module.exports = function(err, req, res, next) {
    err.success = false;
    err.message = "Something went wrong."
    return res.status(500).json(err);
};