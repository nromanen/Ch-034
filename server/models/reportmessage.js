var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

TestSchema = new Schema({
    email: {
        type: String,
        required: "Введіть будь-ласка коректну пошту"
    },
    name: {
        type: String
    },
    text: {
        type: String
    },
    file: {
        type: String
    }
});

module.exports = mongoose.model("Test", TestSchema);