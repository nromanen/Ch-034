var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

MenuSchema = new Schema({
    title: {
        type: String,
        required: "Please set menu title",
    },
    slug: {
        type: String,
        unique: true,
        required: "Please set menu slug"
    },
    _menuLinks: [{
        type: Schema.Types.ObjectId,
        ref: "MenuLink"
    }]
})

module.exports = mongoose.model("Menu", MenuSchema);