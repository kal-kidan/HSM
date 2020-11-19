const express = require('express')
const router = express.Router()
const UserController = require('./../../controllers/UserController') 
const appointmentController = require('./../../controllers/AppointementController') 
const formValidator = require('./../../middleware/form-validator')
router.post('/appointment', formValidator.validateAppointment, appointmentController.makeAppointment)
module.exports = router