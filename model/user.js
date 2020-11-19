const mongoose = require('./../lib/db-connect');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
var mongoosePaginate = require('mongoose-paginate')

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 100,
            validate(value){
                if(!validator.isAlpha(value)){
                    throw new Error("please enter valid name");
                }
            },
           
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 100,
            validate(value){
                if(!validator.isAlpha(value)){
                    throw new Error("please enter valid name");
                }
            }
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("the email is not valid");
                }
            },
            maxlength: 350
        },
        gender: {
            type: String,
            required: true,
            trim: true, 
            validate(value){
                if(!validator.isAlpha(value)){
                    throw new Error("please enter valid gender");
                }
            },
            maxlength: 6
        },
        phoneNumber: {
            type: String,
            required: true,
            maxlength: 20
        },
        address:{      
           region:{
                type: String,
                required: true,
                maxlength: 150
           },
           city:{
            type: String,
            required: true,
            maxlength: 150
           },
           postalCode:{
                type: String,
                required: true,
                maxlength: 10
           },
           street:{
            type: String,
            required: true,
            maxlength: 150
          }

        },
        speciallity:{
            type: String,
            index: true,
            maxlength: 150
        },
        profileImage:{
            type: String,
            default: '',
            maxlength: 150
        },
        availaibleDate:[
        {  
         day: {
               type: String,
               index: true,
               maxlength: 10
           },
           from: {
            type: String,
            index: true,
            maxlength: 10
           },
           to:{
            type: String,
            index: true,
            maxlength: 10
           },
           isBooked:{
               type: Boolean,
               default: false
           }
        }
        ],
        bio:{
            type: String,
            default: '',
            maxlength: 200
        },
        education:[{
            type: String ,
            maxlength: 100
        }],
        experience:[{
            type: String,
            maxlength: 150
        }],
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        verified:{
            type: Boolean,
            default: false
        }, 
        status:{
            type: Boolean,
            default: false
        },
        active:{
            type: Boolean,
            default: true
        },
        role:{
            type: String,
            enum: ['doctor', 'admin', 'patient'],
            required: true,
            maxlength: 10
        },
    } ,
    {timestamps: true}
)

userSchema.plugin(mongoosePaginate);
 
userSchema.methods.getAuthToken = async function (){
    let User= this 
    const token = jwt.sign({
        email: User.email,
        _id: User._id
    }, process.env.TOKEN_KEY); 
    return token;
 }

 userSchema.methods.toJSON = function(){
    const user = this
    userObject = user.toObject()
    delete userObject.password
    delete userObject.verified
    return userObject 
  }

  userSchema.statics.findByCredentials = async (email, password)=>{   
    let User;
    try {
        User = await user.findOne({email})
        if(!User){
            return ("incorrect username or password")
        }

        const isValidPassword = await bcrypt.compare(password, User.password);

        if(!isValidPassword){
            return ("incorrect username or password")
        }
 
    } catch (error) {
        console.log("error finding by credentials \n", error)
    }
    return User;
}

userSchema.pre('save', async function(next){ 
    const user = this
    if(user.isModified('password')){ 
        let salt = bcrypt.genSaltSync(10)
        user.password =  bcrypt.hashSync(user.password, salt)
    }
    next()
})

 

const user = mongoose.model('users',userSchema);

module.exports = {user};