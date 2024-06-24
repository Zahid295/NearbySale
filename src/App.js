import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Register from './Registration/Register';
import Login from './Registration/Login';
import Home from './Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const onRegisterSuccess = () => {
    setIsLoggedIn(true);
    // Trigger redirect with update to state
    setRedirectToHome(true); 
  };

  const onLoginSuccess = () => {
    setIsLoggedIn(true);
    // Trigger redirect with update to state
    setRedirectToHome(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Cancel redirect to home with update to state
    setRedirectToHome(false);
    
  };

  if (redirectToHome) {
    return <Navigate to="/" replace />; 
  }

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace /> : <Register onRegisterSuccess={onRegisterSuccess} />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLoginSuccess={onLoginSuccess} />} />
      </Routes>
    </Router>
  );
};

export default App;

