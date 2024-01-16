const mongoose = require('mongoose')

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('connected to DB');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connectToDb };