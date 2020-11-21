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
        type: Integer,
        requied: true
    },
    exp_month: {
        type: Integer,
        requied: true
    },
    exp_year: {
        type: Integer,
        requied: true
    },
    cvc: {
        type: Integer,
        requied: true
    } 
    
},
{timestamps: true}
)

const card = mongoose.model('card', cardtSchema)
module.exports = {card}