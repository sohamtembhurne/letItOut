const express = require('express')
const router = express.Router();
const userRoutes = require('./userRoutes')
const secretRoutes = require('./secretRoutes')
const authRoutes = require('./authRoutes')

router.use('/user', userRoutes);

router.use('/secrets', secretRoutes);

router.use('/verify', authRoutes);

module.exports = router