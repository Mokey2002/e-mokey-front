import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buyerLogin } from './redux/buyerAuthSlice';
import axios from 'axios';
import { Button, Card, CardBody, Input } from 'reactstrap';

const BuyerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buyerAuth = useSelector((state) => state.buyerAuth.loggedIn); // ✅ Read state from Redux

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const buyerUser = JSON.parse(localStorage.getItem('buyerUser'));
    if (buyerUser && buyerUser.token) {
      dispatch(buyerLogin(buyerUser));
      navigate('/Dashboard');
    }
  }, [dispatch, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Simulated successful login
      const userData = { buyer: { email }, token: 'fake_buyer_token' };
      dispatch(buyerLogin(userData)); // ✅ Dispatch Redux action
      navigate('/Dashboard');
    } catch (error) {
      alert('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <Card className="loginCard">
        <CardBody>
          <h3>Buyer Login</h3>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default BuyerLogin;
