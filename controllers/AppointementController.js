const multer = require('multer')
const fetch = require('node-fetch')

const {appointment} = require('./../model/appointment')
const {user} = require('./../model/user')
const helper = require('./helper')
let appointmentFee = "2000"
const makeAppointment = async (req, res)=>{
    try { 
        let appointmentObj = req.body
        let doctorId = appointmentObj.doctor
        let {date} = appointmentObj
        appointmentObj.patient = req.user._id
        let newAppointment = new appointment(
            req.body
        )
        await newAppointment.save()
        let doctor = await user.findOne({'availaibleDate._id': date})
        let availaibleDate = doctor.availaibleDate.id(date)
        availaibleDate["booked"] = true
        doctor.save()  
        return res.json({status:true, msg:"you have successfuly made an appointment"})

       
    } catch (error) {
        return res.status(500).json({status:false, error: true,  msg: error.message})
    }
}

const getAllDoctorAppointments = async (req, res)=>{
    try { 
     const doctor = req.user
     let appointments = await appointment.find({doctor: doctor._id})
     return res.json(appointments)

    } catch (error) {
      res.status(400).json({error: true, msg: error.message})
    }
 }

 const getAllPatientAppointments = async (req, res)=>{
    try { 
     const patient = req.user
     let appointments = await appointment.find({patient: patient._id})
     return res.json(appointments)

    } catch (error) {
      res.status(400).json({error: true, msg: error.message})
    }
 }

 const uploadAppointmentsFile = async (req, res)=>{
    req.fileName = []
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "uploads/patient");
        },
        filename: helper.renameFile 
      });
      const upload = multer({
        storage: storage,
        limits: { fileSize: 1024*1024*3 },
        fileFilter: helper.validateExtension 
      }).array("files", 10);
    
      upload(req, res, async function(err) {
       if(err){
           res.status(400).json({
               error: true,
               msg: err.message
           })
       }
       else{
          try {
            await appointment.updateOne({patient: req.user._id}, {$addToSet: {files: req.fileName}})
            res.json({status: true, msg: "you have upload successfuly"})  
          } catch (error) {
            res.status(500).json({error: true, msg: error.message})  
          }
       }
    });
 }

 const sendNotification = async (req, res)=>{
    try { 
    let notification = {
        'title': 'you have made an appointment',
        'text': 'appointment object'
    }

    let fcm_tokens = []
    let notification_body = {
        'notification': notification,
        'registration_ids': fcm_tokens
    }
     fetch('https://fcm.googleapis.com/fcm/send', {
         'methods': 'POST',
         'headers': {
             'Authorization': 'key='+
              'AAAA1zF7E3M:APA91bEz6IBoDCCtf8Tl8goXkrlsuxqHuNrLo0EamLKqPd1ig0FkX-8POmG9zfvH8PqdPzW9jorCL7N3d0hqljyo_TFXhnHDY6qP5WQzKhHH6Of21xDlKl0sS_zNA1M5LsPkAImZKMIP',
             'Content-Type': 'application/json'
         },
          'body': JSON.stringify(notification_body)
     }).then(()=>{
         return res.json({status: true, msg: "notification sent successfuly"})
     }).catch((err)=>{
        return res.status(500).json({status: true, msg: err.message})
     })
    } catch (error) {
      res.status(400).json({error: true, msg: error.message})
    }
 }
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
 
module.exports = {
    makeAppointment,
    getAllDoctorAppointments,
    getAllPatientAppointments,
    uploadAppointmentsFile
}