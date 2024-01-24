require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateToken = (id, username) => {
    return jwt.sign({ id, username }, process.env.TOKEN_KEY, {
        expiresIn: '1h'
    })
}

module.exports = { generateToken };