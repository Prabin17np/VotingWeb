import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { UserCircle, Lock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import './Auth.css';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [email,setEmail]= useState("");
  const[password,setPassword] = useState("");
  function handleEmailChange(event) {
    setEmail(() => event.target.value);
   
  }

  function handlePasswordChange(event) {
    setPassword(() => event.target.value);
    
  }
 

  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Logged in", response);

      if (response.data && response.data.data.access_token) {
        localStorage.setItem("token", response.data.data.access_token);
      
      }
    } catch (error) {
     console.log(error);
      

      
    }
    // Handle login logic here, you can check credentials
    console.log('Login submitted:', { ...formData, isAdmin });

    if (isAdmin) {
      navigate('/admindashboard');  // Navigate to AdminDashboard if the user is an admin
    } else {
      navigate('/userdashboard');  // Navigate to UserDashboard if it's a normal user
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{isAdmin ? 'Admin Login' : 'User Login'}</h2>
        
        <div className="toggle-container">
          <button 
            className={`toggle-btn ${!isAdmin ? 'active' : ''}`}
            onClick={() => setIsAdmin(false)}
          >
            User
          </button>
          <button 
            className={`toggle-btn ${isAdmin ? 'active' : ''}`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <UserCircle className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="form-group">
            <Lock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Login
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? 
          <Link to="/signup" className="auth-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
