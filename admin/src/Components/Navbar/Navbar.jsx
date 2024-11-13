import React from 'react';
import navlogo from '../../assets/nav-logo.svg';
import navprofileIcon from '../../assets/nav-profile.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-15 py-5 shadow-sm mb-[1px] bg-white w-11/12 m-auto md:px-30'>
      <img src={navlogo} className='w-[200px] md:w-[150px]' alt="Logo" />
      <img src={navprofileIcon} className='w-[75px] md:w-[60px]' alt="Profile Icon" />

       {/* Login / Logout Button in Side Nav */}
       <div className="items-center hidden lg:block">
        {localStorage.getItem('auth-token') ? (
          <button
            className='bg-red-600 text-white font-bold py-2 px-4 w-full rounded hover:bg-white hover:text-black border-2 border-black transition duration-300'
            onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/"); }}
          >
            Logout
          </button>
        ) : (
          <Link to='admin/login'>
            <button className='bg-black text-white font-bold py-2 px-4 w-full rounded hover:bg-white hover:text-black border-2 border-black transition duration-300'>
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
