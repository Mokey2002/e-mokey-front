import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from './hooks/userAuth';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { loggedIn, user, token } = useAuth();
   const [confirmationinfo, setConfirmationInfo] = useState({
    orderNumber: '',
    totalAmount: '',
    shippingAddress:'123 Main St, Springfield, USA'
    });

    useEffect(() => {
      axios
        .get('http://127.0.0.1:8000/api/orders/', {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Token for authentication
          },
        })
        .then((res) => {
          console.log(res.data);
    
          // ✅ Assuming res.data is an array of orders
          const latestOrder = res.data[res.data.length - 1]; // Get the most recent order
    
          if (latestOrder) {
            setConfirmationInfo((prevInfo) => ({
              ...prevInfo,
              orderNumber: latestOrder.order_id,
              totalAmount: latestOrder.order_amount,
            }));
          }
        })
        .catch((err) => {
          console.error('Error fetching orders:', err);
        });
    }, [token]); // ✅ Only runs when the token changes


  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
      <Card className="w-100" style={{ maxWidth: '500px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '15px' }}>
        <CardBody>
          <CardTitle tag="h1" className="text-center mb-4">Thank You for Your Purchase!</CardTitle>
          <CardText className="text-center">Your order has been placed successfully.</CardText>

          <div className="my-4">
            <h5>Order Summary</h5>
            <p><strong>Order Number:</strong> {confirmationinfo.orderNumber}</p>
            <p><strong>Total Amount:</strong> ${confirmationinfo.totalAmount}</p>
            <p><strong>Shipping Address:</strong> {confirmationinfo.shippingAddress}</p>
          </div>

          <div className="text-center">
            <Button color="primary" onClick={() => navigate('/')}>Continue Shopping</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
