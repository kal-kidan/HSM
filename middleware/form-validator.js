const validationSchema = require('./../lib/validation-schemas')
const {registerDoctorSchema} = validationSchema
const {registerPatientSchema} = validationSchema

const Joi = require('joi')

const validateRegistration = async (req, res, next)=>{
  if(Object.entries(req.body).length=== 0){ 
    return res.json({error:true, msg: "please enter a value"})
  }
  
  let validationResult;
  try {
    if(req.body.role == "doctor"){
      validationResult = await registerDoctorSchema.validateAsync(req.body)
      next()
    }
    else if (req.body.role == "patient"){
      validationResult = await registerPatientSchema.validateAsync(req.body)
      next()
    }
    else{
      return res.json({error:true, msg: "role can only be either doctor or patient"})
    }
      
    }
    catch (err) { 
      return res.json({error: true, message: err.message})
    }
       
}

 
module.exports = {
  validateRegistration
}
