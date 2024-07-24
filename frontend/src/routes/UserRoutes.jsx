import React from 'react'
import {Route , Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/users/Login'
import SignUp from '../pages/users/SignUp'
import Profile from '../pages/users/Profile'
import ProtectedRoute from '../components/ProtactedRoute'
import UpdateProfile from '../pages/users/UpdateProfile'
import AdminLogin from '../pages/admin/AdminLogin'




const UserRoutes = () => {
  return (
    <>
    <Routes>   
        < Route path='/' element={ < Home /> } />
        < Route path='/user/login' element = { < Login /> } />
        < Route path='/user/signup' element = { < SignUp /> } />
        < Route path='/user/profile' element = { <ProtectedRoute >< Profile/></ProtectedRoute>} />
        < Route path='/user/profile/update' element = { <ProtectedRoute >< UpdateProfile/></ProtectedRoute>} />
        < Route path='/admin/login' element = { < AdminLogin />} />
    </Routes>
    </>
  )
}

export default UserRoutes