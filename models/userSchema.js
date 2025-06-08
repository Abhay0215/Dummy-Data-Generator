const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: {type: Number, required: false},
    selected: {type: Boolean}
})

const Users = mongoose.model('User', userSchema);

module.exports = Users;