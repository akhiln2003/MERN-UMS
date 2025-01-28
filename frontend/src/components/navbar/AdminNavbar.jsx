import React from 'react'
import { AudioLines,  } from 'lucide-react';
import Buttons from '../common/Buttons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutadminMutation } from '../../redux/slices/admin/adminApiSlice';
import { logoutAuthAdmin } from '../../redux/slices/admin/adminAuthSlice';



function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { adminInfo } = useSelector((state) => state.adminauth);
  const [ logoutadmin ] = useLogoutadminMutation();
  
  const dispath = useDispatch();
  const current = [ '/admin' ];

  let isHome = current.includes(pathname);
  let textColor =  isHome ? "text-white" : "text-black"
 async function handleLogout() {
    
    try {
      await logoutadmin().unwrap();
      dispath(logoutAuthAdmin());
      navigate('/admin')
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <div className={`w-full h-20 ${isHome ? 'bg-transparent' : 'bg-white'} flex fixed top-0 z-50 border-b-2 border-b-gray-300 `}>
    <div className='flex items-center justify-center w-1/5 text-center h-full font-mono'>
      <AudioLines color= {`${isHome ? "white" : "black"}`} />
      <Link to={'/admin'} className= { ` ml-2 text-xl font-extrabold ${isHome ? 'text-white' : 'text-black'}` } >Admin</Link>
    </div>
    <div className='w-full flex justify-end gap-3 pt-3 pb-4 pr-4'>
   {adminInfo &&
    < Link to={"/admin/dashbord"} className={`${textColor} mt-4`} > Dashbord </Link>}
      { adminInfo ? 
       <Buttons textColor={textColor} text={"Logout" }  onclick={handleLogout} bgColor={"bg-transparent"} width={'w-20'}  />:
       < Link to={ '/admin/login' } ><Buttons textColor={textColor} text={"Login" } bgColor={"bg-transparent"} width={'w-20'}  /></Link>}
    </div>
  </div>
  );
}

export default AdminNavbar;
