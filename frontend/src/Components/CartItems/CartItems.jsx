import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import cross_icon from "../Assets/cart_cross_icon.png";
import { Link } from 'react-router-dom';

export const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, decreaseQuantity, increaseQuantity } = useContext(ShopContext);

    return (
        <div className="container mx-auto px-4"> {/* Centering container */}
            {/* Cart Headers */}
            <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 md:gap-[50px] py-4 text-[#454545] text-[16px] font-semibold">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Size</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr className="h-[2px] bg-[#e2e2e2] border-0" />

            {/* Cart Items */}
            {all_product.map((e) => {
                const cartItem = cartItems[e.id];
                if (cartItem && cartItem.quantity > 0) {
                    return (
                        <div key={e.id}>
                            <div className="grid grid-cols-2 md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 md:gap-[50px] py-4 text-[#454545] text-[16px] font-medium">
                                <img className="h-[55px] mx-auto" src={e.image} alt={e.name} />
                                <p className="text-center md:text-left">{e.name}</p>
                                <p className="text-center md:text-left"><span className='font-bold text-gray-500 block md:hidden'>Price: </span>₹{e.new_price}</p>
                                
                                <div className="w-[55px] h-[45px] mx-auto border-2 border-[#ebebeb] bg-white flex items-center justify-center">
                                    <span className='font-bold text-gray-500 block md:hidden'>Qty: </span>
                                    <span className='bg-gray-200 text-center rounded-lg m-2 px-1 cursor-pointer' onClick={() => decreaseQuantity(e.id)}>-</span>
                                    {cartItem.quantity}
                                    <span className='bg-gray-200 text-center rounded-lg m-2 px-1 cursor-pointer' onClick={() => increaseQuantity(e.id)}>+</span>
                                </div>
                                
                                {/* Display the selected size */}
                                <p className="text-center md:text-left"><span className='font-bold text-gray-500 block md:hidden'>Size: </span>{cartItem.size}</p>

                                <p className="text-center md:text-left"><span className='font-bold text-gray-500 block md:hidden'>Total: </span>₹{e.new_price * cartItem.quantity}</p>
                                
                                <img className="w-[12px] mx-auto md:mx-[30px] cursor-pointer" src={cross_icon} onClick={() => removeFromCart(e.id)} alt="remove" />
                            </div>
                            <hr className="h-[2px] bg-[#e2e2e2] border-0" />
                        </div>
                    );
                }
                return null;
            })}

            {/* Cart Totals and Promo Code Section */}
            <div className="flex flex-col md:flex-row md:gap-[100px] my-10 items-center max-w-2xl mx-auto text-center md:text-left">
                <div className="flex flex-col gap-6 min-w-[300px] mb-8 md:mb-0">
                    <h1 className="text-[24px] font-semibold">Cart Totals</h1>
                    <div className="space-y-4">
                        <div className="flex justify-between py-2 text-[16px] font-medium">
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr className="h-[2px] bg-[#e2e2e2] border-0" />
                        <div className="flex justify-between py-2 text-[16px] font-medium">
                            <p>Shipping fee</p>
                            <p>Free</p>
                        </div>
                        <hr className="h-[2px] bg-[#e2e2e2] border-0" />
                        <div className="flex justify-between py-2 text-[18px] font-semibold">
                            <h3>Total</h3>
                            <h3>₹{getTotalCartAmount()}</h3>
                        </div>
                    </div>

                    <Link to='/checkout'>
                        <button className="w-full md:w-[220px] h-[50px] bg-[#ff5a5a] text-white text-[14px] font-semibold cursor-pointer">
                            PROCEED TO CHECKOUT
                        </button>
                    </Link>
                </div>

                <div className="flex-1 w-full max-w-md text-[16px] font-medium">
                    <p className="text-[#555] mb-4">If you have a promo code, enter it here</p>
                    <div className="flex items-center justify-between w-full h-[50px] bg-[#eaeaea]">
                        <input
                            type="text"
                            placeholder="Promo code"
                            className="flex-1 h-full bg-transparent pl-4 outline-none border-none"
                        />
                        <button className="w-[130px] h-full text-[16px] bg-black text-white cursor-pointer">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
