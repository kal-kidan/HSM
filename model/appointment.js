const mongoose = require('./../lib/db-connect')

const appointmentSchema =  mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    date:{
        type: mongoose.Schema.Types.ObjectId,
        required: true 
    },
    files: [
        {
            type: String
        }
    ],
    symptoms: [
        {
            type: String
        }
    ],
    status:{
        type: String,
        default: 'pending'
    }
},
{timestamp: true}
)

const appointment = mongoose.model('appointments', appointmentSchema)
module.exports = {appointment}