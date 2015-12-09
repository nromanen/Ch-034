var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

MenuSchema = new Schema({
    name: {
        type: String,
        required: "Будьласка введіть назву меню",
    },
    slug: {
        type: String,
        unique: true,
        required: "Будьласка введіть slug меню"
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    access: {
        type: [Number],
        required: true
    },
    _menuLinks: [{
        type: Schema.Types.ObjectId,
        ref: "MenuLink"
    }]
})

module.exports = mongoose.model("Menu", MenuSchema);