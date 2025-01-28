import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {Link , useNavigate } from 'react-router-dom'
import Buttons from '../../components/common/Buttons'
function Profile() {
  const dispatch = useDispatch()
  const [data , setData ] = useState({
    userName : '',
    email : '',
    profileImage : ''
  })
  const { userInfo } = useSelector((state)=>state.auth)
 useEffect(()=>{
  setData({
    userName : userInfo.name,
    email : userInfo.email,
    profileImage : userInfo.profileImage

  })
 },[userInfo.setData ])
  return (
    <div className='w-full h-screen  flex justify-center items-center pt-10 '>
     <div className=' h-[30rem] w-4/5 flex bg-gray-100 rounded-lg '>
     <div className= '  w-1/2  h-[30rem] flex justify-center  items-center '>
        <div className=' w-2/3 h-[25rem] ' >
        <img src = { data.profileImage } alt="Profile image" className='h-full w-full object-cover rounded-lg' />
        
        </div>
     </div>
     <div className= ' w-1/2  h-[30rem] flex-col justify-center'>
      <div className='bg-blue-950 w-4/5 h-[5rem] rounded-xl mt-14 flex items-center ' >
        <p className=' text-2xl font-bold capitalize pl-5 font-sans text-white'>{data.userName}</p>
       </div>
       <div className='w-4/5 mt-5 pl-5 pt-5 mb-10  bg-green-100'>
       <p className='mb-4' ><span className='font-medium '>Email : </span>{data.email}</p>
       <p className='pb-4'><span className='font-medium'>Joined At : </span>07-02/2024</p>
       </div>
     <Link className='' to={'/user/profile/update'} >< Buttons width={'w-3/5'} text={"Edit Profile"} bgColor={"bg-gray-500"} textColor={'text-white'}  /> </Link>
     </div>
     
     </div>
     </div>
   
  )
}

export default Profile