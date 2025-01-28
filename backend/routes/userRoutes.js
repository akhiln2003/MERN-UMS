import express from 'express'
import {
     authUser,
     registerUser,
     logoutUser,
     getUserProfiel,
     updateUserProfile

 } from '../controller/userController.js'
 import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()


router.post('/' , registerUser);
router.post('/auth' , authUser);
router.post('/logout' , logoutUser );
router.route('/profile' ).get( protect , getUserProfiel ).put( protect , updateUserProfile );
router.post('/auth' , authUser);



export default router