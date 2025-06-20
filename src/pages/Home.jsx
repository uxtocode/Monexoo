import React from 'react';
import { Bell, IndianRupee } from 'lucide-react';

const ImprovedHeader = () => {

  return (
    <>
      <div className='flex items-center justify-between'>

        {/* left */}
        <div className='flex md:hidden items-center gap-3'>
          <img src="./logo.png" alt="" className='w-7 h-7 rounded-md'/>
          <h2 className='font-bold text-xl'>Monexo</h2>
        </div>

        <div className='hidden md:block'>
          <h2 className='font-extrabold text-3xl'>Welcome back, Gursharan!</h2>
        </div>

        {/* right */}
        <div className='flex items-center gap-4'>
          <div className="relative">
            <Bell className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#3a3a3a] active:ring-1 ring-green-500 p-2.5 rounded-full cursor-pointer text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full shadow ring-2 ring-[#1a1a1a]">
              3
            </span>
          </div>


          <div className='relative cursor-pointer'>
            <img src="./profile.png" alt="profile" className='w-10 h-10 rounded-full shadow-white active:ring-1 ring-green-500' />
            <div className='w-3 h-3 rounded-full absolute top-0 right-0 bg-green-500'/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImprovedHeader;