import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios'; // Ensure axios is installed

const CheckoutPage = () => {
    const { getTotalCartAmount, cartItems, all_product } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        pincode: '',
        mobile: '',
        paymentMethod: 'cod', // Default to 'Cash on Delivery'
    });

    // Handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to upload order data to the database
    const uploadOrderData = async () => {
        const orderDetails = {
            customer: {
                name: formData.name,
                address: formData.address,
                pincode: formData.pincode,
                mobile: formData.mobile,
            },
            paymentMethod: formData.paymentMethod,
            items: Object.keys(cartItems).map((itemId) => {
                const cartItem = cartItems[itemId];
                const product = all_product.find(prod => prod.id === Number(itemId));
                
                return {
                    productId: itemId,
                    productName: product ? product.name : '',
                    quantity: cartItem.quantity,
                    size: cartItem.size,
                    price: product ? product.price : 0, // Ensure to include price if available
                };
            }),
            totalAmount: getTotalCartAmount(),
            orderDate: new Date().toISOString(), // Add order date
        };

        try {
            const response = await axios.post('/api/orders', orderDetails); // Adjust the endpoint URL as necessary
            console.log('Order saved:', response.data);
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error uploading order:', error);
            alert('There was an issue placing the order. Please try again.');
        }
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        uploadOrderData();
    };

    return (
        <div className="container mx-auto p-6 max-w-md bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Mobile Number */}
                <div>
                    <label className="block text-gray-700">Mobile Number</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        placeholder="Enter your mobile number"
                        required
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-gray-700">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        placeholder="Enter your address"
                        required
                    />
                </div>

                {/* Pincode */}
                <div>
                    <label className="block text-gray-700">Pincode</label>
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        placeholder="Enter your pincode"
                        required
                    />
                </div>

                {/* Product Details */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Product Details</h2>
                    {Object.keys(cartItems).map((itemId) => {
                        const cartItem = cartItems[itemId];
                        const product = all_product.find(prod => prod.id === Number(itemId));
                        
                        // Check if both cartItem and product exist before rendering
                        if (cartItem && product) {
                            return (
                                <div key={itemId} className="mb-4 border-b pb-2">
                                    <p><strong>Product:</strong> {product.name}</p>
                                    <p><strong>Quantity:</strong> {cartItem.quantity}</p>
                                    <p><strong>Selected Size:</strong> {cartItem.size}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>

                {/* Payable Amount */}
                <div>
                    <label className="block text-gray-700">Payable Amount</label>
                    <p>₹{getTotalCartAmount()}</p>
                </div>

                {/* Payment Method */}
                <div>
                    <label className="block text-gray-700 mb-2">Payment Method</label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={formData.paymentMethod === 'cod'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Cash on Delivery
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="online"
                                checked={formData.paymentMethod === 'online'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Online Payment
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;