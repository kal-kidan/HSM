const express = require("express");
const router = express.Router()
const {hasPermission} = require('./../../middleware/permission-guard')
const authController = require('./../../controllers/AuthController')
 
const formValidator = require('./../../middleware/form-validator')
/**
 *  @swagger
 * 
 *  /v1/auth/register:
 *    post:
 *      tags:
 *        - auth
 *      security:
 *        - bearerAuth: []
 *      description: user registration (user, admin)
 *      consumes:
 *        - application/json
 *      requestBody:
 *        content: 
 *          application/json:  
 *            schema:
 *              type: object
 *              properties:
 *                firstName:
 *                  type: string 
 *                lastName:
 *                  type: string
 *                email:
 *                  type: string 
 *                gender:
 *                  type: string 
 *                phoneNumber:
 *                  type: string 
 *                address:
 *                  type: object
 *                  properties:
 *                    region:
 *                      type: string  
 *                    city:
 *                      type: string 
 *                    postalCode:
 *                      type: string 
 *                    street:
 *                      type: string 
 *                speciallity:
 *                  type: string 
 *                availaibleDate:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      day:
 *                        type: string   
 *                      from:
 *                        type: string   
 *                      to:
 *                        type: string 
 *                bio:
 *                  type: string 
 *                education:
 *                  type: array
 *                  items:
 *                    type: string     
 *                experience:
 *                  type: array
 *                  items:
 *                    type: string   
 *                password:
 *                  type: string 
 *                role:
 *                  type: string    
 *      responses:
 *        200:
 *          description:  A JSON object containing user information
 *        401: 
 *          description: incorrect username or password 
 *  
 *     
 */

router.post('/register', hasPermission('register'), formValidator.validateRegistration, authController.register)


/**
 *  @swagger
 * 
 *  /v1/auth/login:
 *    post:
 *      tags:
 *        - auth
 *      description: login
 *      consumes:
 *        - application/json
 *      requestBody:
 *        content: 
 *          application/json:  
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string 
 *                password:
 *                  type: string
 *              example:
 *                email: abebe@gmail.com
 *                pasword: abebe1             
 *      responses:
 *        200:
 *          description:  A JSON object containing user information
 *        401: 
 *          description: incorrect username or password 
 *  
 *     
 */
router.post('/login', authController.login)

/**
 *  @swagger
 * 
 *  /v1/auth/verify:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - auth
 *      description: verify user email
 *      requestBody:
 *        content: 
 *          application/json:  
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  required: true 
 *      responses:
 *        200:
 *          description: your email verified successfuly
 *        400: 
 *          description: invalid token
 */
router.post('/verify', hasPermission('verifyEmail'), authController.verifyEmail)

/**
 *  @swagger
 * 
 *  /v1/auth/forgotpassword:
 *    post:
 *      tags:
 *        - auth
 *      description: verify user email
 *      requestBody:
 *        content: 
 *          application/json:  
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  required: true 
 *      responses:
 *        200:
 *          description: email has been sent 
 *        404: 
 *          description: email not found
 */
router.post('/forgotpassword',authController.forgotPassword)

/**
 *  @swagger
 * 
 *  /v1/auth/resetpassword:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - auth
 *      description: verify user email
 *      requestBody:
 *        content: 
 *          application/json:  
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  required: true 
 *                password:
 *                  type: string
 *                  required: true 
 *      responses:
 *        200:
 *          description: password reseted successfuly
 *        404: 
 *          description: invalid token or password
 */
router.post('/resetpassword',authController.resetPassword)
module.exports = router