const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    secret: String
})

const userModel = new mongoose.model('User', userSchema);

module.exports = { userModel };