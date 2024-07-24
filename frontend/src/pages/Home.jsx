import React from 'react';


function WelcomePage() {
  return (
    <div className="relative w-full h-screen bg-[url('../public/mainBgImage.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden">
  {/* Overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
  
  {/* Text Container */}
  <div className="relative z-10 flex flex-col justify-center h-full text-center">
    <p className='text-white font-bold text-5xl font-serif mb-4'>Welcome to Our User Management System!</p>
    <div className='flex mt-10 justify-center items-center space-x-5'>
    <hr className="border-t-2 border-rose-600 w-20" />
      <div className='text-left'>
        <p className='text-white font-mono text-xl mb-2'>Efficiently Manage Users</p>
        <p className='text-white font-mono text-xl'>Streamline your administrative tasks with ease</p>
      </div>
     
    </div>
  </div>
</div>

  );
}

export default WelcomePage;
