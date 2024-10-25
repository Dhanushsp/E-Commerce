import React from 'react';
import navlogo from '../../assets/nav-logo.svg';
import navprofileIcon from '../../assets/nav-profile.svg';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-15 py-5 shadow-sm mb-[1px] bg-white w-11/12 m-auto md:px-30'>
      <img src={navlogo} className='w-[200px] md:w-[150px]' alt="Logo" />
      <img src={navprofileIcon} className='w-[75px] md:w-[60px]' alt="Profile Icon" />
    </div>
  );
};

export default Navbar;
