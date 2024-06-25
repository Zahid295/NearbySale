import React, { useState } from 'react';
import axios from 'axios'; 
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
    // Initialize history for redirection
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to login endpoint
      await axios.post('/admin/login', credentials);
      // Redirect to the admin dashboard
      history.push('/admin/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
