module.exports = function(err, req, res, next) {
    console.log(err);
    err.success = false;
    err.message = "Something went wrong."

    return res.status(500).json(err);
};