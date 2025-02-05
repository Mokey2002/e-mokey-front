import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buyerLogin } from './redux/buyerAuthSlice';
import axios from 'axios';
import { Button, Card, CardBody, CardTitle, CardText, Input, Spinner } from 'reactstrap';
import '../BuyerLogin.css';
const BuyerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buyerAuth = useSelector((state) => state.buyerAuth.loggedIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const buyerUser = JSON.parse(localStorage.getItem('buyerUser'));
    if (buyerUser && buyerUser.token) {
      dispatch(buyerLogin(buyerUser));
      navigate('/Dashboard');
    }
  }, [dispatch, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      // Simulated successful login
      const userData = { buyer: { email }, token: 'fake_buyer_token' };
      dispatch(buyerLogin(userData));
      navigate('/Dashboard');
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <CardBody>
          <CardTitle tag="h3" className="text-center text-dark fw-bold mb-4">
            Buyer Login
          </CardTitle>
          <CardText className="text-center text-muted mb-4">
            Sign in to explore and purchase amazing products!
          </CardText>

          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3"
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3"
          />

          {error && <div className="text-danger text-center mb-3">{error}</div>}

          <Button
            color="primary"
            className="w-100 fw-bold login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : 'Login'}
          </Button>

          <div className="text-center mt-3">
            <small>
              Don't have an account?{' '}
              <span
                className="text-primary fw-bold"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/buyerRegister')}
              >
                Sign up here
              </span>
            </small>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BuyerLogin;
