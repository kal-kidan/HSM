const {appointment} = require('./../model/appointment')
const {user} = require('./../model/user')
const multer = require('multer')
const helper = require('./helper')
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
module.exports = {
    makeAppointment,
    getAllDoctorAppointments,
    getAllPatientAppointments,
    uploadAppointmentsFile
}