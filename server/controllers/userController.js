const { userModel } = require("../models/userModel");
const { generateToken } = require("../utils/secretToken");

const getUsers = async (req, res) => {
    const allUsers = await userModel.find();

    res.send(allUsers);
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        return res.json({ message: 'User already exists' });
    }

    const newUser = await userModel.create({
        name, email, password
    })

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false
    })

    res.status(201).json({ message: "New user created successfully", success: true, newUser });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.json({ message: "Wrong credentials" })
    }

    if (password === user.password) {
        const token = generateToken(user._id);

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        })
        return res.status(201).json({ message: "User logged in successfully", success: true });
    }

    return res.json({ message: "Wrong credentials" })
}

module.exports = { getUsers, createUser, loginUser };