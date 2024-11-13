import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import { Items } from '../Components/Items/Items';


export const Shopcategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [visibleProducts, setVisibleProducts] = useState(12); // Initial number of products displayed
  const [sortOption, setSortOption] = useState(null); // State to track sort option
  const filteredProducts = all_product.filter(item => item.category === props.category);
  const totalProducts = filteredProducts.length;

  // Sort products based on the selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'highToLow') return b.new_price - a.new_price;
    if (sortOption === 'lowToHigh') return a.new_price - b.new_price;
    return 0;
  });

  // Function to load more products
  const loadMoreProducts = () => {
    setVisibleProducts(prevVisible => prevVisible + 12);
  };

  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className='Shopcategory'>
      <img className='shop-category-banner block my-8 mx-auto w-4/5' src={props.banner} alt="" />

      <div className="shop-Category-indexShort flex flex-col md:flex-row md:mx-44 mx-5 justify-between items-center gap-4">
        <p className="text-center md:text-left">
          <span className="font-semibold text-sm md:text-base">
            Showing 1-{Math.min(visibleProducts, totalProducts)} out of {totalProducts} products
          </span>
        </p>
        <div className="shopcategory-sort flex items-center gap-2 md:gap-3 py-2 px-4 md:py-3 md:px-5 border rounded-3xl border-gray-500 cursor-pointer">
          <span className="text-sm md:text-base">Sort by:</span>
          <select
            onChange={(e) => handleSortChange(e.target.value)}
            className="border-none bg-transparent outline-none text-sm md:text-base"
          >
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>


      <div className="shopcategory-products grid grid-cols-2 md:grid-cols-4 m-10 gap-5">
        {sortedProducts.slice(0, visibleProducts).map((item, i) => (
          <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>

      {visibleProducts < totalProducts && (
        <div
          onClick={loadMoreProducts}
          className="shopcategory-loadmore cursor-pointer flex justify-center items-center mx-auto my-14 lg:my-24 w-40 h-10 md:w-48 md:h-12 rounded-3xl bg-gray-700 text-gray-200 text-sm md:text-base"
        >
          Explore more
        </div>
      )}
       
    </div>
  );
};
