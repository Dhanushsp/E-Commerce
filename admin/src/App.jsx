import React, { useState, useEffect } from 'react';
import './index.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import AddProduct from './Components/AddProduct/AddProduct';
import ListProduct from './Components/ListProduct/ListProduct';
import OrderTracking from './Components/OrderTracking/OrderTracking';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import AdminWelcome from './Components/Home/home';

export const backend_url = 'http://localhost:4000';
export const currency = '₹';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className='Admin'>
      {isAuthenticated && <Navbar />}
      <div className='flex'>
        {isAuthenticated && <Sidebar />}
        <Routes>
          <Route path='/admin/login' element={<LoginSignup setIsAuthenticated={setIsAuthenticated} />} />
          {isAuthenticated ? (
            <>
              <Route path='/' element={<AdminWelcome />} />
              <Route path='/addproduct' element={<AddProduct />} />
              <Route path='/listproduct' element={<ListProduct />} />
              <Route path='/OrderTracking' element={<OrderTracking />} />
            </>
          ) : null}
        </Routes>
      </div>
    </div>
  );
};

export default App;
