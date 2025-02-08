// src/components/BuyerDashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useAuth from './hooks/userAuth';
// Import each feature component

import Profile from './dashboardFeatures/BuyerProfile';
import OrderHistory from './dashboardFeatures/OrderHistory';
import Notifications from './dashboardFeatures/Notifications';
import CartWishlist from './dashboardFeatures/Wishlist';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const buyerAuth = useSelector((state) => state.buyerAuth.loggedIn);
  const { loggedIn, user, token } = useAuth();

  // Check if buyer is logged in
  useEffect(() => {
     console.log(loggedIn,user,token)
    if (!buyerAuth) {
      navigate('/buyerLogin');
      
    }
    //console.log(token)

    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/customers/', {
          headers: {
            'Authorization': `Bearer ${token}`  // ✅ Correct Syntax
          },
        });

        if (response.status === 200) {
          console.log('Data:', response.data.data);
          setBuyerName(response.data.data.name);
        }
      } catch (error) {
        console.error('Request failed:', error.response?.data || error.message);
      }
    };

    fetchData(); // ✅ Call the async function
   
  }, [buyerAuth,navigate,buyerName]);

  // Tab toggling
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Container fluid style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {buyerName}!</h2>
          <p>Manage your shopping experience here.</p>
        </Col>
      </Row>

      {/* Nav Tabs */}
      <Row>
        <Col>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleTab('1')}
              >
                Products
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleTab('2')}
              >
                Order History
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleTab('3')}
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '4' })}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleTab('4')}
              >
                Cart / Wishlist
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '5' })}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleTab('5')}
              >
                Notifications
              </NavLink>
            </NavItem>
          </Nav>

          {/* Tab Content */}
          <TabContent activeTab={activeTab} style={{ marginTop: '20px' }}>

            <TabPane tabId="2">
              <OrderHistory />
            </TabPane>
            <TabPane tabId="3">
              <Profile />
            </TabPane>
            <TabPane tabId="4">
              <CartWishlist />
            </TabPane>
            <TabPane tabId="5">
              <Notifications />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyerDashboard;
