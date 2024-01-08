import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './admin_login.css'; 

import { Link } from 'react-router-dom';
import NavigationBar from '../../../components/navigation/navigation';
import Footer from '../../../components/footer/footer';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(email=="admin@gmail.com" && password== "pass"){
    navigate('/staff/add_offer')
    }
    else{
        alert('Wrong email or password');
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="login-page-container">
        <div className="login-page-content">
          <div className="login-form-container">
            <h1>Admin Login</h1>
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
             
            </form>
          </div>
       
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AdminLogin;
