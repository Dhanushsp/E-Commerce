import React, { useEffect, useState } from 'react';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })

    await fetchInfo();
  }

  return (
    <div className="flex flex-col items-center w-full h-[740px] p-3 md:p-10 m-5 rounded-md bg-white overflow-y-auto">
      <h1 className="text-2xl font-semibold">All Products List</h1>
      <br />
      <div className="grid grid-cols-6 gap-2 md:gap-4 w-full py-4 text-gray-700 text-sm md:text-base font-semibold">
        <p>Products</p> <p>Title</p> <p>Old Price</p> <p>New Price</p> <p>Category</p> <p>Remove</p>
      </div>
      <hr className="w-full mb-4" />
      {allproducts.length > 0 ? (
        allproducts.map((product, index) => (
          <div key={index} className="w-full">
            <div className="grid grid-cols-6 gap-2 md:gap-4 items-center w-full py-4 text-gray-600 font-medium">
              <img className="h-16 md:h-20 object-contain" src={product.image} alt={product.name} />
              <p className="truncate">{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => { removeProduct(product.id) }} className="cursor-pointer mx-auto h-5 w-5" src={cross_icon} alt="Remove" />
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
};

export default ListProduct;
