import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
// import { useAuth } from '../../AuthContext';

export default function Login({setIsLoggedIn}){
  // const { setToken, setIsLoggedIn } = useAuth(); 

  const loginUser = async (credentials) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      // setToken(data.token);
      localStorage.setItem("token",data.token);
      setIsLoggedIn(data.token);

      return true;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await loginUser({ username, password });

    // Handle the result if needed
  };

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired
};
