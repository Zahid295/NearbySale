import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Registration/Logout';

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav>
      <Link to="/"> Home </Link>
      {!isLoggedIn ? (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <Logout onLogout={onLogout} />
      )}
    </nav>
  );
}

export default Navbar;
