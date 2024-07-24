import React from 'react'
import { AudioLines,  } from 'lucide-react';
import Buttons from '../common/Buttons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../redux/slices/usersApiSlice';
import { logOut } from '../../redux/slices/authSlice';


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const current = [ '/' ];
  const { userInfo } = useSelector((state)=>state.auth);
  const [ logoutApiCall ] = useLogoutMutation();
  const dispath = useDispatch();


  let isHome = current.includes(pathname);
  let textColor =  isHome ? "text-white" : "text-black"
  
 async function handleLogout() {
    
    try {
      await logoutApiCall().unwrap();
      dispath(logOut());
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <div className={`w-full h-20 ${isHome ? 'bg-transparent' : 'bg-white'} flex fixed top-0 z-50 border-b-2 border-b-gray-300 `}>
      <div className='flex items-center justify-center w-1/5 text-center h-full font-mono'>
        <AudioLines color= {`${isHome ? "white" : "black"}`} />
        <Link to={'/'} className= { ` ml-2 text-xl font-extrabold ${isHome ? 'text-white' : 'text-black'}` } >USER MANAGEMENT</Link>
      </div>
      <div className='w-full flex justify-end gap-3 pt-3 pb-4 pr-4'>
        {userInfo && < Link to={'/user/profile'} className={`mt-4 ${textColor}  `}  >Profile</Link>}
        { userInfo ? 
         <Buttons textColor={textColor} text={"Logout" }  onclick={handleLogout} bgColor={"bg-transparent"} width={'w-20'}  />:
         < Link to={ '/user/login' } ><Buttons textColor={textColor} text={"Login" } bgColor={"bg-transparent"} width={'w-20'}  /></Link>}
      </div>
    </div>
  );
}

export default Navbar;
