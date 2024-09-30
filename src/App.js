// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './auth/Auth';
import Callback from './components/Callback';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

const auth = new Auth();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home auth={auth} />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={Dashboard} auth={auth} />}
        />
        <Route path="/callback" element={<Callback auth={auth} />} />
      </Routes>
    </Router>
  );
}

export default App;
