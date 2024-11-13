import React, { useContext } from "react";
import { useState } from "react";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

export const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);

    const currency = "₹"; // Define your currency symbol

    const [selectedSize, setSelectedSize] = useState(null);

    // Function to handle size selection
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };


    return (
        <div className="px-[10%] gap-[40px] justify-between md:px-[8%] flex flex-wrap lg:flex-nowrap mt-10">
            {/* Left section with images */}
            <div className="flex gap-[18px] w-full md:justify-center items-center">
                {/* <div className="flex flex-col gap-[20px] md:gap-[10px] ">
                    Thumbnails
                    <img className="h-[68px] max-w-[120px] md:h-[90px] sm:h-[80px] " src={product.image} alt="img" />
                    <img className="h-[68px] max-w-[120px] md:h-[90px] sm:h-[80px] " src={product.image} alt="img" />
                    <img className="h-[68px] max-w-[120px] md:h-[90px] sm:h-[80px] " src={product.image} alt="img" />
                    <img className="h-[68px] max-w-[120px] md:h-[90px] sm:h-[80px] " src={product.image} alt="img" />
                </div> */}
                {/* Main Image */}
                <div className="flex justify-center ">
                    <img className=" h-[350px] md:h-[450px] sm:h-[400px]   object-cover" src={product.image} alt="main product" />
                </div>
            </div>

            {/* Right section with product details */}
            <div >
                {/* Product Title */}
                <h1 className="text-[#3d3d3d] text-[30px] font-bold sm:text-[20px]">{product.name}</h1>

                {/* Rating
                <div className="flex items-center mt-[10px] gap-[5px] text-[#1c1c1c] text-[14px]">
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_dull_icon} alt="star dull" />
                    <p>(122)</p>
                </div> */}

                {/* Price */}
                <div className="flex my-[25px] gap-[20px] text-[22px] font-bold">
                    <div className="text-[#818181] line-through">{currency}{product.old_price}</div>
                    <div className="text-[#ff4141]">{currency}{product.new_price}</div>
                </div>

                {/* Product Description */}
                <div className="mb-[25px]">{product.description}</div>

                {/* Size Selection */}
                <div className="mt-[30px]">
                    <h1 className="text-[#656565] text-[18px] font-semibold">Select Size</h1>
                    <div className="flex gap-[15px] mt-[20px]">
                        {product.sizes.map((size) => (
                            <div
                                key={size}
                                onClick={() => handleSizeSelect(size)}
                                className={`px-[20px] py-[16px] rounded-[3px] cursor-pointer border ${selectedSize === size ? 'border-gray-800 bg-gray-100' : 'border-[#ebebeb] bg-[#fbfbfb]'
                                    }`}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                {/* <button
                    className="mt-[30px] w-[200px] bg-[#FF4141] text-white px-[40px] py-[20px] font-semibold text-[16px] rounded-[3px] cursor-pointer"
                    onClick={() => addToCart(product.id, selectedSize)} // Pass selectedSize to addToCart
                    disabled={!selectedSize} // Disable if no size selected
                >
                    ADD TO CART
                </button> */}

                {/* Add to Cart Button */}
               <button
                    className="mt-[30px] w-[200px] bg-[#FF4141] text-white px-[40px] py-[20px] font-semibold text-[16px] rounded-[3px] cursor-pointer"
                    onClick={() => addToCart(product.id, selectedSize)}
                     // Disable if no size selected
                >
                    ADD TO CART
                </button>

                {/* Category and Tags */}
                <div className="mt-[10px] text-[16px]">
                    <p><span className="font-semibold">Category:</span> {product.category}</p>
                    <p><span className="font-semibold">Tags:</span> Modern, Latest</p>
                </div>
            </div>
        </div>
    );
};
