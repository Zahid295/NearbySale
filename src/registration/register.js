import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, password };
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const body = JSON.stringify(newUser);
      await axios.post('http://localhost:3000/register', body, config);
       // Update isLoggedIn and redirect states
      onRegisterSuccess();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
