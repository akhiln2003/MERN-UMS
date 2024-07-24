import React from 'react'
import UserRoutes from './routes/UserRoutes'
import Navbar from './components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { Flip , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoutes from './routes/AdminRoutes';
import AdminNavbar from './components/navbar/AdminNavbar'
function App() {
  
  const loction = useLocation();
  const {pathname} = loction
  const routesWithoutNavbar = [
    '/user/login',
    '/user/signup',
   
  ];
  const shouldHideNavbar = routesWithoutNavbar.includes(pathname);
  return (

    <>
      { pathname.startsWith("/admin") ? < AdminNavbar /> : !shouldHideNavbar && < Navbar />}
      < ToastContainer autoClose={2000} transition={Flip} position='top-center' />
      < UserRoutes />
      < AdminRoutes />

    </>
    
  )
}

export default App