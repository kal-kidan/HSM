const express = require('express')
const router = express.Router()
const UserController = require('./../../controllers/UserController') 
const appointmentController = require('./../../controllers/AppointementController') 
 
router.post('/appointment', appointmentController.makeAppointment)
module.exports = router