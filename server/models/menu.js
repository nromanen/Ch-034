var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,

MenuSchema = new Schema({
    title: {
        type: String,
        required: "Please menu title",
    },
    _menuLinks: [{
        type: Schema.Types.ObjectId,
        ref: "MenuLink"
    }]
})

module.exports = mongoose.model('Menu', MenuSchema);