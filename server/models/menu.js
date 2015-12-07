var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

MenuSchema = new Schema({
    title: {
        type: String,
        required: "Будьласка введіть назву меню",
    },
    slug: {
        type: String,
        unique: true,
        required: "Будьласка введіть slug меню"
    },
    _menuLinks: [{
        type: Schema.Types.ObjectId,
        ref: "MenuLink"
    }]
})

module.exports = mongoose.model("Menu", MenuSchema);