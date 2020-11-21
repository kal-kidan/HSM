const express = require('express')
const router = express.Router()

//controllers
const UserController = require('./../../controllers/UserController') 
const appointmentController = require('./../../controllers/AppointementController') 
const paymentController = require('./../../controllers/PaymentController') 

//middlewares
const formValidator = require('./../../middleware/form-validator')
const {hasPermission} = require('./../../middleware/permission-guard')
const cardMiddleware = require('./../../middleware/check-card')

router.post('/appointment', hasPermission('makeAppointment'),cardMiddleware.isThereACard, formValidator.validateAppointment, appointmentController.makeAppointment)
router.get('/appointments', hasPermission('getAllPatientAppointments'), appointmentController.getAllPatientAppointments)
router.post('/appointment/file', hasPermission('uploadAppointmentsFile'), appointmentController.uploadAppointmentsFile)
router.post('/payment-card', hasPermission('addPaymentMethod'), formValidator.validateCard, paymentController.addPaymentMethod)
module.exports = router