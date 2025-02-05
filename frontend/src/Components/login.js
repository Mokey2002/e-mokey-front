import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sellerLogin } from './redux/sellerAuthSlice';
import { Button, Card, CardBody, CardTitle, CardText, Input, Spinner } from 'reactstrap';

const Login = () => {
  const [email, setLocalEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sellerAuth = useSelector((state) => state.sellerAuth.loggedIn);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      dispatch(sellerLogin(user));
      navigate('/myItems');
    }
  }, [dispatch, navigate]);

  const onButtonClick = async () => {
    setLoading(true);
    setEmailError('');
    setPasswordError('');

    if (email.trim() === '') {
      setEmailError('Please enter your email');
      setLoading(false);
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      setLoading(false);
      return;
    }

    if (password.trim() === '') {
      setPasswordError('Please enter a password');
      setLoading(false);
      return;
    }

    try {
      // Simulated authentication request
      const userData = { seller: { email }, token: 'fake_seller_token' };
      dispatch(sellerLogin(userData));
      navigate('/myItems');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <CardBody>
          <CardTitle tag="h3" className="text-center text-dark fw-bold mb-4">
            Seller Login
          </CardTitle>
          <CardText className="text-center text-muted mb-4">
            Manage your products and sales with ease!
          </CardText>

          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setLocalEmail(e.target.value)}
            className="mb-3"
          />
          {emailError && <div className="text-danger text-center mb-2">{emailError}</div>}

          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3"
          />
          {passwordError && <div className="text-danger text-center mb-2">{passwordError}</div>}

          <Button
            color="primary"
            className="w-100 fw-bold login-btn"
            onClick={onButtonClick}
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
                onClick={() => navigate('/register')}
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

export default Login;
