import React from 'react';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrums = (props) => {
  const { product } = props;
  return (
    <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm font-medium my-5 mx-[10%] lg:mx-[8%] md:mx-[5%]">
      HOME <img src={arrow_icon} alt="" className="h-3 md:h-2.5" /> SHOP 
      <img src={arrow_icon} alt="" className="h-3 md:h-2.5" /> {product.category} 
      <img src={arrow_icon} alt="" className="h-3 md:h-2.5" /> {product.name} 
    </div>
  );
};

export default Breadcrums;
