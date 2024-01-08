import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css'; 

import { Link } from 'react-router-dom';
import NavigationBar from '../../components/navigation/navigation';
import Footer from '../../components/footer/footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set('userSession', email, { expires: 7 });

        console.log(email);
 
        navigate('/account'); 
      } else {
        console.log('Login failed:', data.message);

      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="login-page-container">
        <div className="login-page-content">
          <div className="login-form-container">
            <h1>Login to Your Account</h1>
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="login-button">Login</button>
              <div className="signup-redirect">
                New here? <Link to="/register">Sign up</Link>
              </div>
            </form>
          </div>
       
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default LoginPage;
