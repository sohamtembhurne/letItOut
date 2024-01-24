const express = require('express');
const { userVerification } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/", userVerification, (req, res) => {
    res.status(200).json(
        {
            message: 'Protected route accessed',
            status: "kakkoi",
            user: res.locals.username
        }
    );
})

module.exports = router;