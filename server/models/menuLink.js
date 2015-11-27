var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,

MenuLinkSchema = new Schema({
    name: {
        type: String,
        required: "Please fill link title",
    },
    published: {
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

module.exports = mongoose.model('MenuLink', MenuLinkSchema);