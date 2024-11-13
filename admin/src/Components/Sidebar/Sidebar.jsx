import React, { useState } from 'react';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';
import { Link } from 'react-router-dom';
import cross_icon from '../../assets/cross_icon.png';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile Screens */}
      <button 
        onClick={toggleSidebar} 
        className="p-2 m-2 top-1 left md:hidden"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-50 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:w-[250px]`}>
        {/* Close Icon for Mobile Sidebar */}
        <div className="flex justify-end p-4 md:hidden">
          <img
            src={cross_icon}
            alt="Close"
            onClick={toggleSidebar}
            className="cursor-pointer h-6 w-6"
          />
        </div>

        <div className="flex flex-col pt-8 gap-5 w-full max-w-[250px] h-full">
          <Link to='/addproduct' style={{ textDecoration: 'none' }}>
            <div className="flex items-center justify-center mx-5 p-2.5 rounded-lg bg-[#F6F6F6] gap-5 cursor-pointer">
              <img src={add_product_icon} alt="Add Product" />
              <p>Add Product</p>
            </div>
          </Link>
          <Link to='/listproduct' style={{ textDecoration: 'none' }}>
            <div className="flex items-center justify-center mx-5 p-2.5 rounded-lg bg-[#F6F6F6] gap-5 cursor-pointer">
              <img src={list_product_icon} alt="Product List" />
              <p>Product List</p>
            </div>
          </Link>
          <Link to='/OrderTracking' style={{ textDecoration: 'none' }}>
            <div className="flex items-center justify-center mx-5 p-2.5 rounded-lg bg-[#F6F6F6] gap-5 cursor-pointer">
              <img src={list_product_icon} alt="Product List" />
              <p>Order Tracking</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
