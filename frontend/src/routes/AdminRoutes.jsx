import React from 'react'
import {Route , Routes} from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'
import Home from '../pages/Home'
import Dashbord from '../pages/admin/Dashbord'
import CreateUser from '../pages/admin/CreateUser'


function AdminRoutes() {

  return (
   <Routes>
    < Route path= "/admin" element={ < Home/> } />
    < Route path= "/admin/login" element={ < AdminLogin /> } />
    < Route path= "/admin/dashbord" element={ < Dashbord /> } />
    < Route path= "/admin/adduser" element={ < CreateUser /> } />
   </Routes>
  )
}

export default AdminRoutes