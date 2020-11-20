 const path = require('path')
 
 validateExtension = (req, file, callback) =>{  
    if(!(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"|| path.extname(file.originalname)==".pdf" || path.extname(file.originalname)==".docx" || path.extname(file.originalname)==".doc") ){
      req.fileValidationError = 'please enter valid file only image, pdf and doc file are allowed';
      return callback(new Error('please enter valid file only image, pdf and doc file are allowed'), false); 
    } 
    callback(null, true)
  }
  renameFile = (req, file, callback) => {
    let fileName =  file.fieldname + '-' +Date.now() + Math.round(Math.random() * 1E9)+  path.extname(file.originalname)
    req.fileName.push("/uploads/patient/"+ fileName)
    callback(null, fileName) 
   
}
  module.exports={
      validateExtension,
      renameFile
  }