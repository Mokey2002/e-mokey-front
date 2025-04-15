// src/components/dashboardFeatures/Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import useAuth from "../hooks/userAuth";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');

    try {
      // Example real API call:
      // const buyerUser = JSON.parse(localStorage.getItem('buyerUser'));
       const response = await axios.get('http://127.0.0.1:8000/api/customers/', {
         headers: { Authorization: `Bearer ${token}` }
       });
      // console.log(';;;')
      // console.log(response.data)
      // console.log(response.data.data)
      // console.log(';;;')
       setProfileInfo({
        email: response.data.data.email,
        username: response.data.data.username
      
      });

      // Simulated data
      /*
      setProfileInfo({
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe'
      });*/
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Could not load profile info.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h5>Loading profile...</h5>;
  }

  if (error) {
    return <h5 style={{ color: 'red' }}>{error}</h5>;
  }

  return (
    <div>
      <h5>Your Profile</h5>
      <p>
        <strong>Email:</strong> {profileInfo.email}
      </p>
      <p>
        <strong>Username:</strong> {profileInfo.username}
      </p>

      {/* Add more fields or an edit form as needed */}
      <Button color="secondary">Edit Profile</Button>
    </div>
  );
};

export default Profile;
