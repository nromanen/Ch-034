var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

module.exports = mongoose.model('Group', new Schema({
    name: [String],
}));