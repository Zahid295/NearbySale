
import React, { useState } from 'react';
import axios from 'axios'; 
import { useHistory } from 'react-router-dom';

const AdminRegister = () => {
  // Initialize history for redirection
  const history = useHistory(); 

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Make an API call t0 registration endpoint
      await axios.post('/api/admin/register', formData);
      // Redirect to the login page
      history.push('/admin/login');
    } catch (error) {
      console.error('Error registering admin:', error.message);
    }
  };

  return (
    <div>
      <h2>Admin Registration</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
