import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
    
      const response = await axios.post('https://cerulean-bandicoot-tux.cyclic.app/login', {
        username,
        password,
      });

      if (response.status === 200) {
        // Login successful
        const token = response.data.token;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // const headers = {
        //     Authorization: `Bearer ${token}`
        // }

        // Redirect to the desired page or perform any other actions
        console.log('Login successful');
      } else {
        // Login failed
        console.log('Login failed:', response.data.error);
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
