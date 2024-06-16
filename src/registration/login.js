import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const body = JSON.stringify(credentials);
      await axios.post('http://localhost:5000/login', body, config);
      onLoginSuccess(); // Update the isLoggedIn state and redirect
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
