const mongoose = require('./../lib/db-connect')
const cardtSchema =  mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'user' 
    },
    customerId: {
        type: String,
        required: true 
    },
    tokenId:{
        type: String,
        required: true 
    },
    cardId:{
          type: String,
          requied: true
        },
    number: {
        type: Number,
        requied: true
    },
    exp_month: {
        type: Number,
        requied: true
    },
    exp_year: {
        type: Number,
        requied: true
    },
    cvc: {
        type: String,
        requied: true
    } 
    
},
{timestamps: true}
)

const card = mongoose.model('card', cardtSchema)
module.exports = {card}