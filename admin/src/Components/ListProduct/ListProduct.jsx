import React, { useEffect, useState } from 'react';
import cross_icon from '../../assets/cross_icon.png';
import { backend_url, currency } from '../../App';


const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null); // Track which product is expanded

  const fetchInfo = async () => {
    try {
      const response = await fetch(`${backend_url}/allproducts`);
      const data = await response.json();
      setAllProducts(data);
      console.log(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch(`${backend_url}/removeproduct`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });

    await fetchInfo();
  };

  const toggleDetails = (id) => {
    setExpandedProduct(expandedProduct === id ? null : id);
  };

  return (
    <div className="flex flex-col items-center w-full h-[740px] p-3 md:p-10 m-5 rounded-md bg-white overflow-y-auto">
      <h1 className="text-2xl font-semibold">All Products List</h1>
      <br />
      <div className="hidden md:grid grid-cols-7 gap-2 md:gap-4 w-full py-4 text-gray-700 text-sm md:text-base font-semibold">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Available Sizes</p>
        <p>Remove</p>
      </div>
      <hr className="w-full mb-4 hidden md:block" />

      {allproducts.length > 0 ? (
        allproducts.map((product, index) => (
          <div key={index} className="w-full mb-4">
            <div className="flex md:grid grid-cols-7 gap-2 md:gap-4 items-center w-full py-4 text-gray-600 font-medium">
              <img className="h-16 md:h-20 object-contain" src={product.image} alt={product.name} />
              <p className="truncate">{product.name}</p>
              {/* Show remaining details only on larger screens */}
              <p className="hidden md:block">${product.old_price}</p>
              <p className="hidden md:block">${product.new_price}</p>
              <p className="hidden md:block">{product.category}</p>
              <p className="hidden md:block">{product.sizes?.join(', ') || 'N/A'}</p>
              <img
                onClick={() => removeProduct(product.id)}
                className="hidden md:block cursor-pointer mx-auto h-5 w-5"
                src={cross_icon}
                alt="Remove"
              />
              {/* Dropdown button for mobile */}
              <button
                onClick={() => toggleDetails(product.id)}
                className="md:hidden text-blue-500 text-sm"
              >
                {expandedProduct === product.id ? 'Hide Details' : 'Show Details'}
              </button>
              <img
                onClick={() => removeProduct(product.id)}
                className="cursor-pointer h-5 w-5 md:hidden"
                src={cross_icon}
                alt="Remove"
              />
            </div>

            {/* Additional product details for mobile view */}
            {expandedProduct === product.id && (
              <div className="flex flex-col gap-2 p-2 md:hidden bg-gray-100 rounded-md">
                <p><span className="font-semibold">Old Price:</span> ${product.old_price}</p>
                <p><span className="font-semibold">New Price:</span> ${product.new_price}</p>
                <p><span className="font-semibold">Category:</span> {product.category}</p>
                <p><span className="font-semibold">Sizes:</span> {product.sizes?.join(', ') || 'N/A'}</p>

              </div>
            )}
            <hr className="md:hidden" />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
};

export default ListProduct;
