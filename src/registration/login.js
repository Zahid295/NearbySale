import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const body = JSON.stringify(credentials);
      const res = await axios.post('http://localhost:3000/login', body, config);
      console.log(res.data); // Get the token
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
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
