import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input
} from 'reactstrap';

const BuyerRegister = () => {
  const navigate = useNavigate();

  // Local state to store registration form data
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Simple error message holder
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setErrorMessage(''); // Reset error message as user types
  };

  // Handle form submission
  const handleSubmit = async () => {
    const { email, password, confirmPassword } = formState;

    // Basic validation: check if fields are filled
    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // Example: Real API request (uncomment and adjust endpoint & payload)
      // const response = await axios.post('http://127.0.0.1:8000/api/buyerRegister/', {
      //   email,
      //   password
      // });
      // if (response.data.success) {
      //   alert('Account created successfully! You can now log in.');
      //   navigate('/buyerLogin');
      // } else {
      //   setErrorMessage(response.data.message || 'Registration failed.');
      // }

      // Simulated success (remove this block when you use a real API):
      alert('Account created successfully! You can now log in.');
      navigate('/buyerLogin');

    } catch (error) {
      console.error('Error creating account:', error);
      // Provide a user-friendly message
      setErrorMessage('Registration failed. Please try again.');
    }
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
          maxWidth: '500px',
          width: '100%',
          borderRadius: '15px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
        }}
      >
        <img
          alt="Create Buyer Account"
          src="https://picsum.photos/500/250"
          style={{
            width: '100%',
            height: '250px',
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
              textAlign: 'center'
            }}
          >
            Create Buyer Account
          </CardTitle>
          <CardSubtitle
            tag="h6"
            className="mb-3 text-muted"
            style={{
              textAlign: 'center'
            }}
          >
            Join us and start shopping now!
          </CardSubtitle>

          {errorMessage && (
            <div
              style={{
                color: 'red',
                textAlign: 'center',
                marginBottom: '10px'
              }}
            >
              {errorMessage}
            </div>
          )}

          <div style={{ marginBottom: '10px' }}>
            <Input
              type="email"
              name="email"
              value={formState.email}
              placeholder="Email"
              onChange={handleChange}
              style={{
                marginBottom: '10px',
                textAlign: 'center'
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Input
              type="password"
              name="password"
              value={formState.password}
              placeholder="Password"
              onChange={handleChange}
              style={{
                marginBottom: '10px',
                textAlign: 'center'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Input
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              style={{
                textAlign: 'center'
              }}
            />
          </div>

          <Button
            color="primary"
            size="lg"
            style={{
              width: '100%',
              borderRadius: '25px',
              fontSize: '18px',
              padding: '10px'
            }}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default BuyerRegister;
