const multer = require("multer")
const path = require("path")
const fs = require('fs')
const User = require('./../model/user').user
const helper = require("./helper")
 
 
const uploadImage = async (req, res) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/images");
      },
      filename: helper.renameFile 
    });
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1024*1024*3 },
      fileFilter: helper.validateExtension 
    }).single("profileImage");
  
    upload(req, res, async function(err) {
     if(err){
         res.json({
             error: true,
             msg: err.message
         })
    
     }
     else{
        try {
            const {user} = req
            let {_id} = user 
            let {profileImage} = user
            let name = path.basename(profileImage)
            if(profileImage.length > 0){
              let filePath = path.join(__dirname, '..', 'uploads', 'images', name)
              fs.unlink(filePath, (err)=>{
                if (err) {
                  return res.json({error: true, msg: err.message})
                }
              })
            }
            await User.findOneAndUpdate({_id}, {profileImage: `/uploads/images/${req.fileName}`}, {useFindAndModify: false})
           return res.json({status: true, msg: "image uploaded successfuly"}) 
        } catch (error) {
            return res.status(500).json({error: true, msg: error.message})
            
        }
     }
  });
    
  }

  const getDoctorById = async (req, res)=>{
   
     try {
      const {_id} = req.params
      let user = await User.findById(_id)
      if(!user || user.role!=="doctor"){
          return res.status(404).json({error: true, msg: `we couldn't find a doctor with id ${_id}`})
      }
      user = user.toObject()
      user.address = ''
      delete user.active; delete user.status ;delete user.role; delete user.verified;
      delete user.createdAt; delete user.updatedAt; delete user.address
      return res.send(user)

     } catch (error) {
       res.status(400).json({error: true, msg: error.message})
     }
  }

  const searchDoctor = async (req, res)=>{
    const escapeStringRegexp = require('escape-string-regexp');
    try {
     let {speciallity} = req.query
     speciallity = escapeStringRegexp(speciallity)
     let exp = new RegExp(`${speciallity}`, "i")
     let user = await User.find({speciallity: {$regex: exp}}) 
     if(user.length==0){
         return res.status(404).json({error: true, msg: `we couldn't find a doctor with speciallity ${speciallity}`})
     }
     return res.send(user)

    } catch (error) {
      res.status(400).json({error: true, msg: error.message})
    }
 }


  module.exports = {
      uploadImage,
      getDoctorById,
      searchDoctor
  }