var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

MenuLinkSchema = new Schema({
    name: {
        type: String,
        required: "Будьласка заповніть назву меню",
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    access: {
        type: [Number],
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("MenuLink", MenuLinkSchema);