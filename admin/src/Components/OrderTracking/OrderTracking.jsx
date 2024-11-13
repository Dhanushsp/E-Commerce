import React, { useState, useEffect } from 'react';
import { backend_url } from '../../App';
import { currency } from '../../App';

const OrderTracking = () => {
    const [orders, setOrders] = useState([]);

    // Fetch orders from the backend API when the component mounts
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${backend_url}/OrderTracking`); // Adjust URL if necessary
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    // Toggle order placed status
    const handleOrderPlaced = (id) => {
        setOrders(orders.map(order =>
            order._id === id ? { ...order, isPlaced: !order.isPlaced } : order
        ));
        // Optionally, send an update to the backend for order status change
    };

    // Delete an order
    const handleDeleteOrder = async (id) => {
        try {
            await fetch(`${backend_url}/deleteorder/${id}`, {
                method: 'DELETE',
            });
            setOrders(orders.filter(order => order._id !== id));
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    // Toggle show details on small screens
    const toggleShowDetails = (id) => {
        setOrders(orders.map(order =>
            order._id === id ? { ...order, showDetails: !order.showDetails } : order
        ));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Order Tracking</h1>

            {orders.map(order => (
                <div key={order._id} className="border p-4 mb-4 rounded-md shadow-md">
                    <div className="flex justify-between items-center">
                        {/* Basic info for small screens */}
                        <div>
                            <p className="text-sm font-medium">{new Date(order.date).toLocaleDateString()}</p>
                            <p className="font-semibold">{order.customer.name}</p>
                        </div>
                        <button
                            className="text-blue-500 hover:underline md:hidden"
                            onClick={() => toggleShowDetails(order._id)}
                        >
                            {order.showDetails ? 'Hide Details' : 'Show More'}
                        </button>
                    </div>

                    {/* Full details for larger screens or when "Show More" is clicked */}
                    <div className={`${order.showDetails ? 'block' : 'hidden'} md:block mt-4`}>
                        <p><strong>Address:</strong> {order.customer.address}</p>
                        <p><strong>Payment Mode:</strong> {order.paymentMethod}</p>
                        <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                        <div className="mt-2">
                            <p className="font-semibold">Items:</p>
                            {order.items.map((item, index) => (
                                <div key={index} className="pl-4">
                                    <p><strong>Product:</strong> {item.productName}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Size:</strong> {item.size}</p>
                                    <p><strong>Price:</strong> ₹{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={order.isPlaced}
                                onChange={() => handleOrderPlaced(order._id)}
                                className="form-checkbox h-4 w-4 text-indigo-600"
                            />
                            <span className="text-sm">Order Placed</span>
                        </label>
                        <button
                            onClick={() => handleDeleteOrder(order._id)}
                            className="text-red-600 font-semibold hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderTracking;
