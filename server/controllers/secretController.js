const { Secret } = require("../models/secretModel")

const getSecrets = async (req, res) => {
    try {
        const results = await Secret.find()
        res.json({ message: "Get successful", results })
    } catch (err) {
        console.error(err);
    }
}

const postSecret = async (req, res) => {
    const text = req.body.content
    const userId = req.body.userId

    try {

        const secretExists = await Secret.findOne({ userId })

        if (secretExists) {
            res.status(409).json({
                message: "Secret already exists",
                secretExists
            })
        } else {

            const newSecret = new Secret({ userId, text })

            await newSecret.save();

            res.status(201).json({
                message: "Secret created",
                newSecret
            })
        }
    } catch (err) {
        console.error(err);
    }
}

const updateSecret = async (req, res) => {

}

module.exports = { getSecrets, postSecret }