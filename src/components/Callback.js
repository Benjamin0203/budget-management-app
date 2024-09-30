// src/components/Callback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = ({ auth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.handleAuthentication();
    navigate('/dashboard');
  }, [auth, navigate]);

  return <h2>Loading...</h2>;
};

export default Callback;
