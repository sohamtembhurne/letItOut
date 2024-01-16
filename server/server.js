require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const { connectToDb } = require('./config/db')

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

connectToDb();

app.use("/", userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})