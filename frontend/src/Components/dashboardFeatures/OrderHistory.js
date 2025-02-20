import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/userAuth';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loggedIn, user, token } = useAuth();
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchOrderHistory = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/orders/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });

        console.log('API Response:', response.data);

        setOrders(Array.isArray(response.data.order) ? response.data.order : [response.data.order]);
        setItems(response.data.items)
      } catch (err) {
        console.error('Error fetching order history:', err);
        setError('Could not load order history.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []); // ✅ Runs only once

  useEffect(() => {
    if (orders.length > 0) {
      console.log("Updated orders:", orders);
    }
  }, [orders]); // ✅ Runs only when `orders` changes

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
          <li key={order.order_id} style={{ marginBottom: '15px' }}>
            <strong>Order ID:</strong> {order.order_id} <br />
            <strong>Date:</strong> {order.order_date} <br />
            <strong>Items:</strong> {items.map(item => item.product.name).join(', ')} <br />
            <strong>Total:</strong> ${order.order_amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
