var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

module.exports = mongoose.model("Area", new Schema({
    name: String,
}));