import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { backend_url } from "../App";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch(`${backend_url}/allproducts`)
            .then((response) => response.json())
            .then((data) => setAll_Product(data));

        if (localStorage.getItem("auth-token")) {
            fetch(`${backend_url}/getcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
            })
                .then((resp) => resp.json())
                .then((data) => { setCartItems(data) });
        }
    }, []);


    // const addToCart = (itemId) => {
    //     if (!localStorage.getItem("auth-token")) {
    //         alert("Please Login");
    //         return;
    //     }
    //     const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] + 1 };
    //     setCartItems(updatedCart);

    //     if (localStorage.getItem("auth-token")) {
    //         fetch('http://localhost:4000/addtocart', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'auth-token': `${localStorage.getItem("auth-token")}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ itemId, updatedCart }),
    //         })
    //             .then((response) => response.json())
    //             .then((data) => console.log(data))
    //             .catch((error) => console.error('Error adding to cart:', error));
    //     }
    // };

    // const increaseQuantity = (itemId) => {
    //     const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] + 1 };
    //     setCartItems(updatedCart);

    //     // Update the server with the new quantity if the user is authenticated
    //     if (localStorage.getItem('auth-token')) {
    //         fetch('http://localhost:4000/increaseproductquantity', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'auth-token': `${localStorage.getItem('auth-token')}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ itemId: itemId })
    //         })
    //             .then((response) => response.json())
    //             .then((data) => console.log(data))
    //             .catch((error) => console.error('Error increasing quantity:', error));
    //     }
    // };

    // const decreaseQuantity = (itemId) => {
    //     const updatedCart = { ...cartItems };

    //     // Decrease the quantity by 1 if it's greater than 1, or remove the item from the cart if quantity is 1 or less
    //     if (updatedCart[itemId] > 1) {
    //         updatedCart[itemId] -= 1;
    //     } else {
    //         delete updatedCart[itemId]; // Remove the item if quantity goes to zero
    //     }

    //     setCartItems(updatedCart);

    //     // Update the server with the new quantity or item removal if the user is authenticated
    //     if (localStorage.getItem('auth-token')) {
    //         fetch('http://localhost:4000/decreaseproductquantity', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'auth-token': `${localStorage.getItem('auth-token')}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ itemId: itemId })
    //         })
    //             .then((response) => response.json())
    //             .then((data) => console.log(data))
    //             .catch((error) => console.error('Error decreasing quantity:', error));
    //     }
    // };


    // const increaseQuantity = (itemId, size) => {
    //     // Ensure the selected size remains while increasing the quantity
    //     const updatedCart = { 
    //         ...cartItems, 
    //         [itemId]: { 
    //             ...cartItems[itemId], 
    //             quantity: (cartItems[itemId]?.quantity || 0) + 1,
    //             size: size 
    //         } 
    //     };
    //     setCartItems(updatedCart);

    //     // Send the updated quantity and size to the server
    //     if (localStorage.getItem('auth-token')) {
    //         fetch('http://localhost:4000/increaseproductquantity', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'auth-token': `${localStorage.getItem('auth-token')}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ itemId, size }) // Send both itemId and size
    //         })
    //         .then((response) => response.json())
    //         .then((data) => console.log(data))
    //         .catch((error) => console.error('Error increasing quantity:', error));
    //     }
    // };

    // const decreaseQuantity = (itemId, size) => {
    //     const updatedCart = { ...cartItems };

    //     // Decrease the quantity by 1 or remove the item if quantity is 1
    //     if (updatedCart[itemId]?.quantity > 1) {
    //         updatedCart[itemId].quantity -= 1;
    //     } else {
    //         delete updatedCart[itemId]; // Remove item if quantity goes to zero
    //     }

    //     setCartItems(updatedCart);

    //     // Send the updated quantity and size to the server
    //     if (localStorage.getItem('auth-token')) {
    //         fetch('http://localhost:4000/decreaseproductquantity', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'auth-token': `${localStorage.getItem('auth-token')}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ itemId, size }) // Send both itemId and size
    //         })
    //         .then((response) => response.json())
    //         .then((data) => console.log(data))
    //         .catch((error) => console.error('Error decreasing quantity:', error));
    //     }
    // };

    const addToCart = (itemId, selectedSize) => {
        if (!localStorage.getItem("auth-token")) {
            alert("Please Login");
            return;
        }

        // Update cart with item and selected size
        const updatedCart = {
            ...cartItems,
            [itemId]: {
                quantity: cartItems[itemId] ? cartItems[itemId].quantity + 1 : 1,
                size: selectedSize
            }
        };
        setCartItems(updatedCart);

        // Send updated cart to server
        fetch(`${backend_url}/addtocart`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'auth-token': `${localStorage.getItem("auth-token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId, size: selectedSize, quantity: updatedCart[itemId].quantity }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error adding to cart:', error));
    };





    const increaseQuantity = (itemId, selectedSize) => {
        if (!localStorage.getItem("auth-token")) {
            alert("Please Login");
            return;
        }

        // Check if item already exists in the cart with the selected size
        const itemExists = cartItems[itemId] && cartItems[itemId].size === selectedSize;

        // Update cart with item and selected size
        const updatedCart = {
            ...cartItems,
            [itemId]: {
                quantity: cartItems[itemId].quantity + 1, // Increase quantity if item exists
                size: cartItems[itemId].size  // Preserve size if item exists
            }
        };

        // Set the updated cart in state
        setCartItems(updatedCart);

        // Send updated cart to the server
        fetch(`${backend_url}/addtocart`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'auth-token': `${localStorage.getItem("auth-token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemId,
                size: updatedCart[itemId].size, // Ensure the correct size is sent
                quantity: updatedCart[itemId].quantity,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error updating cart:', error));
    };




    const decreaseQuantity = (itemId, selectedSize) => {
        if (!localStorage.getItem("auth-token")) {
            alert("Please Login");
            return;
        }

        // Check if item already exists in the cart with the selected size
        const itemExists = cartItems[itemId] && cartItems[itemId].size === selectedSize;

        // Update cart with item and selected size
        const updatedCart = {
            ...cartItems,
            [itemId]: {
                quantity: cartItems[itemId].quantity - 1, // decrease quantity if item exists
                size: cartItems[itemId].size
            }
        };

        // Set the updated cart in state
        setCartItems(updatedCart);

        // Send updated cart to the server
        fetch(`${backend_url}/addtocart`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'auth-token': `${localStorage.getItem("auth-token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemId,
                size: updatedCart[itemId].size,
                quantity: updatedCart[itemId].quantity,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error updating cart:', error));
    };




    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            delete updatedCart[itemId]; // Remove the item completely from the cart
            return updatedCart;
        });

        // Only proceed with the fetch if the user is authenticated
        if (localStorage.getItem('auth-token')) {
            fetch(`${backend_url}/removefromcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: itemId })
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error removing item:', error));
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const cartItem = cartItems[itemId];

            // Check if the item exists and has a quantity greater than 0
            if (cartItem && cartItem.quantity > 0) {
                const itemInfo = all_product.find(product => product.id === Number(itemId));

                // Ensure itemInfo exists before accessing new_price
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItem.quantity;
                }
            }
        }
        return totalAmount;
    };


    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] && cartItems[item].quantity > 0) {
                totalItems += cartItems[item].quantity;
            }
        }
        return totalItems;
    };

    // In ShopContext.js
    const saveCheckoutData = async (orderData) => {
        try {
            const response = await fetch(`${backend_url}/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) throw new Error('Failed to save order data');
            const result = await response.json();
            console.log('Order saved:', result);
        } catch (error) {
            console.error('Error saving order data:', error);
        }
    };



    const contextValue = {
        getTotalCartItems,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        decreaseQuantity,
        increaseQuantity,
        saveCheckoutData
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
