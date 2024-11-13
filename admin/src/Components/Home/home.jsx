import React from 'react';

function AdminWelcome({ onLogin }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
            <p className="text-lg md:text-xl mb-6 max-w-lg">
                Take control of your site. Manage orders, products, users, and more with full access to the admin panel.
            </p>
            <h3 className="text-2xl font-light text-yellow-300 mb-8">
                Get full control over your site!
            </h3>

            <button 
                onClick={onLogin}
                className="px-8 py-3 text-lg font-semibold text-gray-900 bg-yellow-300 rounded-full shadow-md hover:bg-yellow-400 hover:scale-105 transform transition duration-300 ease-in-out"
            >
                Login to Access Admin Panel
            </button>
        </div>
    );
}

export default AdminWelcome;
