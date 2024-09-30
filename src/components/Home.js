// src/components/Home.js
import React from 'react';

const Home = ({ auth }) => {
  return (
    <div>
      <h1>Budget Management App</h1>
      <button onClick={auth.login}>Log In</button>
    </div>
  );
};

export default Home;
