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
    const userId = req.body.userId;
    const text = req.body.content;

    try {

        let existingSecret = await Secret.findOne({ userId });

        if (!existingSecret) {
            const newSecret = new Secret({ userId, text });
            await newSecret.save();
            res.status(201).json({
                message: "New secret created",
                newSecret
            });
            return;
        }

        existingSecret.text = text;

        await existingSecret.save();
        res.status(200).json({
            message: "Secret updated successfully",
            existingSecret
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = { getSecrets, postSecret, updateSecret }