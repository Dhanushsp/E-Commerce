// app.js

import React from 'react'
import './index.css'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import { LoginSignup } from './Components/LoginSignup/LoginSignup'
import { useState } from 'react'

export const backend_url = 'http://localhost:4000';
export const currency = '₹';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle successful authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return isAuthenticated ? (
    <>
      <Navbar />
      <Admin />
    </>
  ) : (
    <LoginSignup onAuthSuccess={handleAuthSuccess} />
  );
};




