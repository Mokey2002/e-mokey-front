import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Spinner, Alert, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserAuth from './hooks/useUserAuth';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { loggedIn, token } = useUserAuth();

  // State variables
  const [confirmationInfo, setConfirmationInfo] = useState({
    orderNumber: '',
    totalAmount: '',
    shippingAddress: '123 Main St, Springfield, USA',
  });
  const [items, setItems] = useState([]); // Stores purchased items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loggedIn || !token) {
      setError("You must be logged in to view your order.");
      setLoading(false);
      return;
    }

    axios
      .get('http://127.0.0.1:8000/api/orders/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Order Data:", res.data);
        
        // ✅ Ensure the response has an order and items
        const latestOrder = res.data.order;
        const orderItems = res.data.items || [];

        if (latestOrder) {
          setConfirmationInfo({
            orderNumber: latestOrder?.order_id || 'N/A',
            totalAmount: latestOrder?.order_amount || '0.00',
            shippingAddress: '123 Main St, Springfield, USA' // Default Address
          });

          setItems(orderItems); // Store order items
        } else {
          setError("No recent orders found.");
        }
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setError("Failed to fetch order details. Please try again.");
      })
      .finally(() => setLoading(false));

  }, [token]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
      {loading ? (
        <Spinner color="primary" />
      ) : error ? (
        <Alert color="danger" fade={false}>
          {error}
        </Alert>
      ) : (
        <Card className="w-100" style={{ maxWidth: '600px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '15px' }}>
          <CardBody>
            <CardTitle tag="h1" className="text-center mb-4">Thank You for Your Purchase!</CardTitle>
            <CardText className="text-center">Your order has been placed successfully.</CardText>

            {/* Order Summary */}
            <div className="my-4">
              <h5>Order Summary</h5>
              <p><strong>Order Number:</strong> {confirmationInfo?.orderNumber || 'N/A'}</p>
              <p><strong>Total Amount:</strong> ${confirmationInfo?.totalAmount || '0.00'}</p>
              <p><strong>Shipping Address:</strong> {confirmationInfo?.shippingAddress || 'N/A'}</p>
            </div>

            {/* Items Purchased */}
            <h5 className="mt-4">Items Purchased</h5>
            {items.length === 0 ? (
              <p>No items in this order.</p>
            ) : (
              <Table bordered striped>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price ($)</th>
                    <th>Total ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.product.name}</td>
                      <td>{item.quantity}</td>
                      <td>${parseFloat(item.product.price).toFixed(2)}</td>
                      <td>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <div className="text-center mt-4">
              <Button color="primary" onClick={() => navigate('/')}>Continue Shopping</Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default OrderConfirmation;
