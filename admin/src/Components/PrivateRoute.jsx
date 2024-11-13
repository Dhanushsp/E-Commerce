// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('auth-token');
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
