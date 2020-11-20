const mongoose = require('./../lib/db-connect')
const {user} = require('./user')
const appointmentSchema =  mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
        async validate(value){
            let existingUser =  await user.findOne({_id: value, role: 'doctor'})
            if(!existingUser){
                throw new Error("please enter valid doctor id");
            }
        }
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
        async validate(value){
            let existingUser =  await user.findOne({_id: value, role: 'patient'})
            if(!existingUser){
                throw new Error("please enter valid patient id");
            }
        }
    },
    date:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        async validate(value){
            let existingUser =  await user.findOne({'availaibleDate._id': value})
            if(!existingUser || existingUser.booked==true){
                throw new Error("please enter valid date id");
            }
            let availaibleDate = existingUser.availaibleDate.id(value)
            if(availaibleDate.booked==true){
                throw new Error("this schedule is already booked");
            }
           
        }
    },
    files: [
        {
            type: String
        }
    ],
    symptoms: [
        {
            type: String,
            maxlength: 300
        }
    ],
    status:{
        type: String,
        default: 'pending' 
    }
},
{timestamps: true}
)

const appointment = mongoose.model('appointment', appointmentSchema)
module.exports = {appointment}