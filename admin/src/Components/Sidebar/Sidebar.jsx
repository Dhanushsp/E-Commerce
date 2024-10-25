import React from 'react';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='flex flex-col pt-8 gap-5 w-full max-w-[250px] h-screen bg-white'>
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
    </div>
  );
};

export default Sidebar;
