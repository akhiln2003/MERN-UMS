import React from 'react'
import {Route , Routes} from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'

function AdminRoutes() {

  return (
   <Routes>
    < Route path= "/admin/login" element={ < AdminLogin /> } />
   </Routes>
  )
}

export default AdminRoutes