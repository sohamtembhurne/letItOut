const mongoose = require("mongoose");

const secretSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

const Secret = mongoose.model('Secret', secretSchema)

module.exports = { Secret };