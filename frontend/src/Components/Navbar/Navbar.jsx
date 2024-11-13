import React, { useState, useEffect, useRef, useContext } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const sideNavRef = useRef(null);
  const { getTotalCartItems } = useContext(ShopContext);

  // Close side nav when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Ensure the click is outside the side nav
      if (isSideNavOpen && sideNavRef.current && !sideNavRef.current.contains(e.target)) {
        setIsSideNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSideNavOpen]);

  return (
    <div className='navbar flex justify-around items-center p-4 relative'>
      {/* Toggle Button for Side Nav */}
      <button className="side-nav-toggle lg:hidden" onClick={() => setIsSideNavOpen(!isSideNavOpen)}>
        <span className="text-2xl">☰</span> {/* Toggle icon */}
      </button>

      {/* Logo and Company Name - Centered on small screens */}
      <div className="nav-logo flex items-center gap-3 mx-auto lg:mx-0">
        <img src={logo} className='w-10 md:w-14' alt="Logo" />
        <p className='text-gray-500 text-xl md:text-2xl font-semibold'>DHANUSH E-COM</p>
      </div>

      {/* Main Nav Links - Hidden on small screens */}
      <ul className="nav-menu items-center gap-12 text-gray-500 text-[15px] font-medium hidden lg:flex">
        <li onClick={() => setMenu("shop")} className='cursor-pointer flex flex-col items-center gap-1'>
          <Link to='/'>Shop</Link>
          {menu === "shop" && <hr className='border-none w-4/5 h-1 rounded-xl bg-red-500' />}
        </li>
        <li onClick={() => setMenu("men")} className='cursor-pointer flex flex-col items-center gap-1'>
          <Link to='/mens'>Mens'</Link>
          {menu === "men" && <hr className='border-none w-4/5 h-1 rounded-xl bg-red-500' />}
        </li>
        <li onClick={() => setMenu("women")} className='cursor-pointer flex flex-col items-center gap-1'>
          <Link to='/womens'>Womens'</Link>
          {menu === "women" && <hr className='border-none w-4/5 h-1 rounded-xl bg-red-500' />}
        </li>
        <li onClick={() => setMenu("kids")} className='cursor-pointer flex flex-col items-center gap-1'>
          <Link to='/kids'>Kids'</Link>
          {menu === "kids" && <hr className='border-none w-4/5 h-1 rounded-xl bg-red-500' />}
        </li>
      </ul>

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
          <Link to='/login'>
            <button className='bg-black text-white font-bold py-2 px-4 w-full rounded hover:bg-white hover:text-black border-2 border-black transition duration-300'>
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Cart Icon - Aligned to the right on small screens */}
      <div className="cart-icon flex items-center">
        <Link to='/cart'>
          <img src={cart_icon} alt="Cart" className="w-6 h-6" />
        </Link>
        <div className="nav-cart-count w-5 h-5 flex justify-center items-center -mt-4 -ml-3 rounded-xl bg-red-500 text-white">
          {getTotalCartItems()}
        </div>
      </div>

      {/* Side Navigation */}
      {isSideNavOpen && (
        <div ref={sideNavRef} className="side-nav fixed inset-0 bg-gray-800 bg-opacity-75 flex z-50 lg:hidden">
          <div className="side-nav-content w-64 h-full bg-white p-5 flex flex-col gap-4">
            {/* Close Icon */}
            <button className="self-end text-2xl" onClick={() => setIsSideNavOpen(false)}>×</button>

            {/* User Greeting and Cart */}
            <p className="text-slate-900 text-xl font-semibold">Hi, User</p>
            <Link to='/cart' className="flex items-center gap-2">
              <img src={cart_icon} alt="Cart" />
              <span className="nav-cart-count w-5 h-5 flex justify-center items-center rounded-xl bg-red-500 text-white">
                {getTotalCartItems()}
              </span>
            </Link>

            {/* Side Nav Links */}
            <ul className="side-nav-links flex flex-col gap-4 text-slate-700 text-lg font-medium">
              <li onClick={() => setMenu("shop")}>
                <Link to='/'>Shop</Link>
              </li>
              <li onClick={() => setMenu("men")}>
                <Link to='/mens'>Mens'</Link>
              </li>
              <li onClick={() => setMenu("women")}>
                <Link to='/womens'>Womens'</Link>
              </li>
              <li onClick={() => setMenu("kids")}>
                <Link to='/kids'>Kids'</Link>
              </li>
            </ul>

            {/* Login / Logout Button in Side Nav */}
            <div className="mt-auto">
              {localStorage.getItem('auth-token') ? (
                <button
                  className='bg-red-600 text-white font-bold py-2 px-4 w-full rounded hover:bg-white hover:text-black border-2 border-black transition duration-300'
                  onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/"); }}
                >
                  Logout
                </button>
              ) : (
                <Link to='/login'>
                  <button className='bg-black text-white font-bold py-2 px-4 w-full rounded hover:bg-white hover:text-black border-2 border-black transition duration-300'>
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
