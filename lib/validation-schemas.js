const Joi = require('joi')
const registerDoctorSchema =  Joi.object({
  firstName: Joi.string().alphanum().max(100).required().error(() => {
    return {
      message: 'please enter valid name'
    };
  }),
  lastName: Joi.string().alphanum().max(100).required() ,
  email: Joi.string().email().max(350).required(),
  gender: Joi.string().alphanum().max(6).required(),
  phoneNumber: Joi.string().max(20).required(),
  address: Joi.object({
    region: Joi.string().max(150).required(),
    city: Joi.string().max(150).required(),
    postalCode: Joi.string().max(150).required(),
    street: Joi.string().max(150).required()
  }),
  speciallity:Joi.string().max(150).required(),
  availaibleDate: Joi.array().required().items(
    Joi.object(
      {
        day: Joi.string().required(),
        from: Joi.string().required(),
        to: Joi.string().required(),
      }
    )
  ),
  bio: Joi.string().max(200).required(),
  education: Joi.array().required().items(
    Joi.string().max(100).required()
  ),
  experience: Joi.array().required().items(
    Joi.string().max(150).required()
  ),
  password: Joi.string().min(6).max(50).required(),
  role: Joi.string().required() 
})

 
const registerPatientSchema = Joi.object({
  firstName: Joi.string().alphanum().max(100).required(),
  lastName: Joi.string().alphanum().max(100).required(),
  email: Joi.string().email().max(350).required(),
  gender: Joi.string().alphanum().max(6).required(),
  phoneNumber: Joi.string().max(20).required(),
  address: Joi.object({
    region: Joi.string().alphanum().max(150).required(),
    city: Joi.string().max(150).required(),
    postalCode: Joi.string().alphanum().max(150).required(),
    street: Joi.string().max(150).required()
  }).required(),
  bio: Joi.string().max(200),
  password: Joi.string().min(6).max(50).required(),
  role: Joi.string().required()
})

module.exports = {
   registerDoctorSchema,
   registerPatientSchema
}


// firstName: Joi.string().alphanum().max(100).required().error(() => {
//   return {
//     message: 'please enter valid name'
//   };
// }),
// lastName: Joi.string().alphanum().max(100).required().error(() => {
//   return {
//     message: 'please enter valid name'
//   };
// }),
// email: Joi.string().email().max(350).required().error(() => {
//   return {
//     message: 'please enter valid email'
//   };
// }),
// gender: Joi.string().alphanum().max(6).required().error(() => {
//   return {
//     message: 'please enter valid gender'
//   };
// }),
// phoneNumber: Joi.string().max(20).required().error(() => {
//   return {
//     message: 'please enter valid phone number'
//   };
// }),
// address: Joi.object({
//   region: Joi.string().alphanum().max(150).required(),
//   city: Joi.string().alphanum().max(150).required(),
//   postalCode: Joi.string().alphanum().max(150).required(),
//   street: Joi.string().alphanum().max(150).required()
// }).error(() => {
//   return {
//     message: 'please enter valid adress containing region, city, postal code and street'
//   };
// }),
// speciallity:Joi.string().alphanum().max(150).required().error(() => {
//   return {
//     message: 'please enter valid speciallity max of 150'
//   };
// }),
// availaibleDate: Joi.array().required().items(
//   Joi.object(
//     {
//       day: Joi.string().required(),
//       from: Joi.date().required(),
//       to: Joi.date().required(),
//     }
//   )
// ).error(() => {
//   return {
//     message: 'please enter at least one valid available date'
//   };
// }),
// bio: Joi.string().max(200).required().error(() => {
//   return {
//     message: 'please enter valid bio max of 200 charachters'
//   };
// }),
// education: Joi.array().required().items(
//   Joi.string().alphanum().max(100).required()
// ).error(() => {
//   return {
//     message: 'please enter atleast on valid education max of 100 charachters'
//   };
// }),
// experience: Joi.array().required().items(
//   Joi.string().alphanum().max(150).required()
// ).error(() => {
//   return {
//     message: 'please enter atleast on valid experience max of 150 charachter'
//   };
// }),
// password: Joi.string().min(6).max(50).required().error(() => {
//   return {
//     message: 'please enter valid password between 6 to 50 charachters'
//   };
// }),
// role: Joi.string().required().error(() => {
//   return {
//     message: 'please enter valid password between 6 to 50 charachters'
//   };
// })