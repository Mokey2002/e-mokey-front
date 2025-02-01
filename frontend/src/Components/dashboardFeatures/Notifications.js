// src/components/dashboardFeatures/Notifications.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    setError('');

    try {
      // Example real API call:
      // const buyerUser = JSON.parse(localStorage.getItem('buyerUser'));
      // const response = await axios.get('http://127.0.0.1:8000/api/notifications', {
      //   headers: { Authorization: `Bearer ${buyerUser.token}` }
      // });
      // setNotifications(response.data.notifications);

      // Simulated data
      setNotifications([
        { id: 1, message: 'Your order #ABC123 has shipped.', date: '2025-01-02' },
        { id: 2, message: 'New flash sale starting soon!', date: '2025-01-08' }
      ]);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Could not load notifications.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h5>Loading notifications...</h5>;
  }

  if (error) {
    return <h5 style={{ color: 'red' }}>{error}</h5>;
  }

  if (!notifications.length) {
    return <p>No notifications at this time.</p>;
  }

  return (
    <div>
      <h5>Your Notifications</h5>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id} style={{ marginBottom: '10px' }}>
            <strong>{notif.date}:</strong> {notif.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
