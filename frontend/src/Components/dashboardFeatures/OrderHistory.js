// src/components/dashboardFeatures/OrderHistory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    setLoading(true);
    setError('');

    try {
      // Example real API call:
      // const buyerUser = JSON.parse(localStorage.getItem('buyerUser'));
      // const response = await axios.get('http://127.0.0.1:8000/api/orderHistory', {
      //   headers: { Authorization: `Bearer ${buyerUser.token}` }
      // });
      // setOrders(response.data.orders);

      // Simulated data
      const simulatedOrders = [
        {
          orderId: 'ABC123',
          date: '2025-01-01',
          items: ['Sample Product 1', 'Sample Product 2'],
          total: 65.99
        },
        {
          orderId: 'XYZ789',
          date: '2025-01-10',
          items: ['Sample Product 3'],
          total: 29.99
        }
      ];
      setOrders(simulatedOrders);
    } catch (err) {
      console.error('Error fetching order history:', err);
      setError('Could not load order history.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h5>Loading order history...</h5>;
  }

  if (error) {
    return <h5 style={{ color: 'red' }}>{error}</h5>;
  }

  if (!orders.length) {
    return <h5>You have no orders yet.</h5>;
  }

  return (
    <div>
      <h5>Your Order History</h5>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId} style={{ marginBottom: '15px' }}>
            <strong>Order ID:</strong> {order.orderId} <br />
            <strong>Date:</strong> {order.date} <br />
            <strong>Items:</strong> {order.items.join(', ')} <br />
            <strong>Total:</strong> ${order.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
