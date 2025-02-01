import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  Input
} from 'reactstrap';

const BuyerLogin = ({ setLoggedIn, setEmail }) => {
  const navigate = useNavigate();

  // Local states for form fields and error handling
  const [emailLocal, setEmailLocal] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const buyerUser = JSON.parse(localStorage.getItem('buyerUser'));
    if (buyerUser && buyerUser.token) {
      setLoggedIn(true);
      setEmail(buyerUser.email);
      // If desired, you can navigate immediately if user is already logged in
      // navigate('/buyerDashboard');
    }
  }, [setLoggedIn, setEmail]);

  const validateFields = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    // Simple email validation
    if (!emailLocal.trim()) {
      setEmailError('Please enter your email.');
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailLocal)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password.');
      isValid = false;
    }

    return isValid;
  };

  // Handle login logic
  const handleLogin = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      // Example: Real API request
      // const response = await axios.post('http://127.0.0.1:8000/api/buyerLogin/', {
      //   email: emailLocal,
      //   password,
      // });
      // if (response.data.success) {
      //   const { token } = response.data;
      //   localStorage.setItem(
      //     'buyerUser',
      //     JSON.stringify({ email: emailLocal, token })
      //   );
      //   setEmail(emailLocal);
      //   setLoggedIn(true);
      //   navigate('/buyerDashboard');
      // } else {
      //   alert('Invalid credentials. Please try again.');
      // }

      // ---- Simulated Success (Remove this block for real API) ----
      localStorage.setItem(
        'buyerUser',
        JSON.stringify({ email: emailLocal, token: 'fake_buyer_token' })
      );
      setEmail(emailLocal);
      setLoggedIn(true);
      navigate('/Dashboard');
      // ---- End of simulated block ----
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation to create account page
  const handleCreateAccount = () => {
    // Navigate to a "BuyerRegister" or "CreateAccount" route
    navigate('/buyerRegister');
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card
        style={{
          maxWidth: '600px',
          borderRadius: '15px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          width: '100%'
        }}
      >
        {/* Replace this image with your own or a relevant illustration */}
        <img
          alt="Buyer Login"
          src="https://picsum.photos/600/300"
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px'
          }}
        />

        <CardBody style={{ padding: '20px' }}>
          <CardTitle
            tag="h3"
            style={{
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginBottom: '10px'
            }}
          >
            Buyer Login
          </CardTitle>
          <CardSubtitle
            tag="h6"
            className="mb-3 text-muted"
            style={{
              textAlign: 'center',
              fontSize: '16px'
            }}
          >
            Welcome! Please sign in to continue
          </CardSubtitle>
          <CardText
            style={{
              fontSize: '16px',
              color: '#666',
              lineHeight: '1.6',
              textAlign: 'center',
              marginBottom: '20px'
            }}
          >
            Explore products and easily add them to your cart.
          </CardText>

          <div style={{ marginBottom: '20px' }}>
            <Input
              type="email"
              value={emailLocal}
              placeholder="Enter your email"
              onChange={(e) => setEmailLocal(e.target.value)}
              style={{
                marginBottom: '10px',
                textAlign: 'center'
              }}
            />
            {emailError && (
              <div style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem' }}>
                {emailError}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                marginBottom: '10px',
                textAlign: 'center'
              }}
            />
            {passwordError && (
              <div style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem' }}>
                {passwordError}
              </div>
            )}
          </div>

          <CardFooter
            style={{
              backgroundColor: '#f8f9fa',
              borderTop: '1px solid #e9ecef',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Button
              color="primary"
              size="lg"
              style={{
                width: '100%',
                borderRadius: '25px',
                fontSize: '18px',
                padding: '10px'
              }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login as Buyer'}
            </Button>

            {/* CREATE ACCOUNT BUTTON */}
            <Button
              color="secondary"
              size="lg"
              style={{
                marginTop: '15px',
                width: '100%',
                borderRadius: '25px',
                fontSize: '18px',
                padding: '10px'
              }}
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
          </CardFooter>
        </CardBody>
      </Card>
    </div>
  );
};

export default BuyerLogin;
