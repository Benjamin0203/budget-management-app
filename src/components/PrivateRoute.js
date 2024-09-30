// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth }) => {
  return auth.isAuthenticated() ? (
    <Component auth={auth} />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
