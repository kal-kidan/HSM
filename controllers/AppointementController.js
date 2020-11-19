const {appointment} = require('./../model/appointment')
const makeAppointment = (req, res)=>{
    try { 
        let newAppointment = new appointment(
            req.body
        )
        await newAppointment.save()
        return res.json({status:true, msg:"you have successfuly made an appointment"})

       
    } catch (error) {
        return res.status(500).json( { status:false, error: true,  msg: error.message})
    }
}