const express = require('express')
const router = express.Router()

//controllers
const UserController = require('./../../controllers/UserController') 
const appointmentController = require('./../../controllers/AppointementController') 

//middlewares
const formValidator = require('./../../middleware/form-validator')
const {hasPermission} = require('./../../middleware/permission-guard')
router.post('/appointment', hasPermission('makeAppointment'), formValidator.validateAppointment, appointmentController.makeAppointment)
router.get('/appointments', hasPermission('getAllPatientAppointments'), appointmentController.getAllPatientAppointments)
router.post('/appointment/file', hasPermission('uploadAppointmentsFile'), appointmentController.uploadAppointmentsFile)
module.exports = router