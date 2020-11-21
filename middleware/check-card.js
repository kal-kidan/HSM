const {card} = require('./../model/card')
const isThereACard= async (req, res, next)=>{ 
    try {
      let existingUser = await card.findOne({user: req.user._id})
      if(!existingUser){
          return res.status(402).json({error: true, msg: "please add payment card"})
      }
      next()
      }
      catch (err) { 
        return res.json({error: true, message: err.message})
      }
         
  }
  
  module.exports = {
    isThereACard
  }
  