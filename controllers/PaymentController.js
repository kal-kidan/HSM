const {card} = require('./../model/card')
const {user} = require('./../model/user')
const addPaymentMethod = async(req, res)=>{
    try {
        let user = req.user
        let passedCard = req.body.card
        let param = {
            email: user.email,
            name: user.firstName + user.lastName,
          }
       let customer = await  stripe.customers.create(param, {maxNetworkRetries: 2})
       param = {card: passedCard}
       let token = await stripe.tokens.create(param,{maxNetworkRetries: 2})
       let createdCard =   await stripe.customers.createSource(customer.id, {source: token.id})
       let saveCard = new card({user: user._id, customerId: customer.id, cardId: createdCard.id,tokenId: token.id,
         number:passedCard.number,exp_month: passedCard.exp_month, exp_year: passedCard.exp_year, cvc: passedCard.cvc })
       await saveCard.save()
    } catch (error) {
        return res.statu(500).json({error: true, msg: err.message})
    }
    
 }
module.exports = {
  addPaymentMethod
}