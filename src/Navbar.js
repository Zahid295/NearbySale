import React from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import Login from './registration/login';
import Register from './registration/register';
import Logout from './registration/logout';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
