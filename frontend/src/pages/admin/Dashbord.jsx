import React, { useEffect, useMemo, useState } from 'react'
import Buttons from '../../components/common/Buttons'
import { useFetchusersQuery } from '../../redux/slices/admin/adminApiSlice';
import UserList from '../../components/UserList';
import { Link } from 'react-router-dom';

function Dashbord() {
    const { data: usersData, isLoading, error, refetch } = useFetchusersQuery();
    
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
      const filteredUsers = useMemo(() => {
        if (!usersData || !usersData?.users) return [];
        return usersData?.users?.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }, [usersData, searchTerm]);

  return (
    <div className=' w-full h-auto bg-gray-200 px-20 py-10'>
        <div className='w-full  bg-white  mt-[5rem] rounded-xl '>
            <div className='w-full h-20 border-b-2 border-gray-200 gap-5  flex justify-end pr-5 py-5  pt-5'>
                <input 
                type="text" 
                placeholder='Search....' 
                className=' pl-5 bg-gray-300  w-1/3 rounded-lg text-xl '
                value={searchTerm}
                onChange={handleSearch}
                 />
                 < Link to={'/admin/adduser'}>< Buttons text={"Create User"} bgColor={'bg-blue-500'} width={'w-24'} /></Link>
            </div>
            
                 
                 {isLoading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error fetching users: {error.message}</p>
                  ) : (
                    filteredUsers.map(user => (
                        < UserList key={user._id} user={user} refetch={refetch} />
                    
                    ))
                  )}
               
            
            
        </div>
    </div>
  )
}

export default Dashbord