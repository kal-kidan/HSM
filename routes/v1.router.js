const express = require('express')
const router = express.Router()

const authRoute = require('./v1/auth.router')
const indexRoute = require('./v1/index.router') 
const userRoute = require('./v1/user.router')
const patientRoute = require('./v1/patient.router')

router.use('/common', indexRoute) 
router.use('/auth', authRoute)
router.use('/user', userRoute) 
router.use('/p', patientRoute) 

module.exports = router