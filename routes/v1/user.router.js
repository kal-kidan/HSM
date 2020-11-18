const express = require('express')
const router = express.Router()
const UserController = require('./../../controllers/UserController') 

/**
 * @swagger
 * /v1/user/profile-image:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - user
 *     description: upload user profile image
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 type: file
 *                 required: true
 *     response:
 *       200: 
 *         description: successfuly uploaded message      
 *       400: 
 *         description: enter valid image file      
 * 
 */
router.patch('/profile-image', UserController.uploadImage)

module.exports = router