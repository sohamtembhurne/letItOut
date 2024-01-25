const express = require('express');
const secretController = require('../controllers/secretController')
const { userVerification } = require('../middlewares/authMiddleware');
const router = express.Router()

router.get('/', secretController.getSecrets)

router.post('/', userVerification, secretController.postSecret)

module.exports = router;