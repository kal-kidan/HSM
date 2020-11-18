const express = require('express')
const router = express.Router()

const authRoute = require('./v1/auth.router')
const indexRoute = require('./v1/index.router') 
const userRoute = require('./v1/user.router')
router.use('/common', indexRoute) 
router.use('/auth', authRoute)
router.use('/user', userRoute) 

module.exports = router