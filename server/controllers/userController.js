const { User } = require("../models/userModel");
const { generateToken } = require("../utils/secretToken");

const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.send(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const createUser = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const loginUser = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { getUsers, createUser, loginUser };