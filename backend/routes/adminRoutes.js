import express from 'express'
import { 
        authAdmin , 
        createUser, 
        editUser, 
        getAdminDashbord, 
        logoutAdmin, 
        deleteUser 
    } from '../controller/adminController.js'

const adminRoutes = express.Router()


// adminRoutes.post('/admin' ,  );
adminRoutes.post('/login' , authAdmin);
adminRoutes.post('/logout' , logoutAdmin );
adminRoutes.get('/dashbord' , getAdminDashbord  )
adminRoutes.post('/createuser' , createUser );
adminRoutes.put('/editUser/:id' , editUser );
adminRoutes.delete('/editUser/:id' , deleteUser );



export default adminRoutes