const { User } = require("../models/userModel");
const { generateToken } = require("../utils/secretToken");

const getUsers = async (req, res) => {
    const allUsers = await User.find();

    res.send(allUsers);
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.json({ message: 'User already exists' });
    }

    const newUser = await User.create({
        name, email, password
    })

    const token = generateToken(newUser._id, newUser.email);
    res.status(201).json({ message: "New user created successfully", success: true, token, newUser });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ message: "Wrong credentials" })
    }

    if (password === user.password) {
        const token = generateToken(user._id, user.email);

        return res.status(200).json({ message: "User logged in successfully", token, success: true });
    }

    return res.json({ message: "Wrong credentials" })
}

module.exports = { getUsers, createUser, loginUser };