import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Registration/Register';
import Login from './Registration/Login';
import Home from './Home';
import AdminDashboard from './Dashboard';
import AdminRegister from './components/AdminRegistration/AdminRegister';
import AdminLogin from './components/AdminRegistration/AdminLogin';
import AdminLogout from './components/AdminRegistration/AdminLogout';


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
    // setRedirectToHome(true);
    return <Navigate to="/Home" />;
  };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   // Cancel redirect to home with update to state
  //   setRedirectToHome(false);
    
  // };

  if (redirectToHome) {
    return <Navigate to="/" replace />; 
  }

  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace /> : <Register onRegisterSuccess={onRegisterSuccess} />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLoginSuccess={onLoginSuccess} />} />
      <Route path="/adminRegister" element={<AdminRegister/>} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/adminLogout" component={<AdminLogout />} />

      </Routes>
      </div>
  );
};

export default App;

