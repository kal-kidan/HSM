const {appointment} = require('./../model/appointment')
const makeAppointment = async (req, res)=>{
    try { 
        let appointmentObj = req.body
        appointmentObj.patient = req.user._id
        let newAppointment = new appointment(
            req.body
        )
        await newAppointment.save()
        return res.json({status:true, msg:"you have successfuly made an appointment"})

       
    } catch (error) {
        return res.status(500).json( { status:false, error: true,  msg: error.message})
    }
}

module.exports = {
    makeAppointment
}