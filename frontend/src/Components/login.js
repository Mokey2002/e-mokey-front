import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setLoggedIn, setEmail }) => {
  const [email, setLocalEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      setLoggedIn(true);
      setEmail(user.email);
    }
  }, []);

  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');

    if (email.trim() === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (password.trim() === '') {
      setPasswordError('Please enter a password');
      return;
    }

//    try {
      // Simulated authentication request
       //const response = await axios.post('http://127.0.0.1:8000/api/login/', {
       // email,
       // password
      //});

      //if (response.data.success) {
        localStorage.setItem('user', JSON.stringify({ email, token: 'response.data.token' }));
        
        setLoggedIn(true); // Update state
        setEmail(email);

        navigate('/myItems');
     // } else {
     //   alert('Invalid credentials. Please try again.');
     // }
    //} catch (error) {
     // console.error('Error during login:', error);
     // alert('Login failed. Please try again.');
   // }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Login</div>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setLocalEmail(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input className="inputButton" type="button" onClick={onButtonClick} value="Log in" />
      </div>
    </div>
  );
};

export default Login;
