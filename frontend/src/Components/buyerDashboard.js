// src/components/BuyerDashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';

// Import your feature components
import Profile from './dashboardFeatures/BuyerProfile';
import OrderHistory from './dashboardFeatures/OrderHistory';
import Notifications from './dashboardFeatures/Notifications';
import CartWishlist from './dashboardFeatures/Wishlist';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [buyerEmail, setBuyerEmail] = useState('');
  const [activeTab, setActiveTab] = useState('1');

  // Check if buyer is logged in
  useEffect(() => {
    const buyerUser = JSON.parse(localStorage.getItem('buyerUser'));
    if (!buyerUser || !buyerUser.token) {
      navigate('/buyerLogin');
      return;
    }
    setBuyerEmail(buyerUser.email);
  }, [navigate]);

  // Handle tab switching
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div style={styles.pageBackground}>
      <Container fluid style={styles.container}>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card style={styles.card}>
              <CardBody style={styles.cardBody}>
                {/* Header */}
                <div style={styles.headerSection}>
                  <h2 style={styles.title}>Welcome, {buyerEmail}!</h2>
                  <p style={styles.subtitle}>
                    Manage your shopping experience here.
                  </p>
                </div>

                {/* Navigation Pills */}
                <Nav pills style={styles.navPills}>
                  <NavItem style={styles.navItem}>
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => toggleTab('1')}
                      style={{ cursor: 'pointer', ...styles.navLink }}
                    >
                      Products
                    </NavLink>
                  </NavItem>
                  <NavItem style={styles.navItem}>
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => toggleTab('2')}
                      style={{ cursor: 'pointer', ...styles.navLink }}
                    >
                      Order History
                    </NavLink>
                  </NavItem>
                  <NavItem style={styles.navItem}>
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => toggleTab('3')}
                      style={{ cursor: 'pointer', ...styles.navLink }}
                    >
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem style={styles.navItem}>
                    <NavLink
                      className={classnames({ active: activeTab === '4' })}
                      onClick={() => toggleTab('4')}
                      style={{ cursor: 'pointer', ...styles.navLink }}
                    >
                      Cart / Wishlist
                    </NavLink>
                  </NavItem>
                  <NavItem style={styles.navItem}>
                    <NavLink
                      className={classnames({ active: activeTab === '5' })}
                      onClick={() => toggleTab('5')}
                      style={{ cursor: 'pointer', ...styles.navLink }}
                    >
                      Notifications
                    </NavLink>
                  </NavItem>
                </Nav>

                {/* Tab Content */}
                <TabContent activeTab={activeTab} style={styles.tabContent}>
                  {/* PRODUCTS TAB */}
                  <TabPane tabId="1">
                    <div style={styles.placeholder}>
                      <h4 style={{ color: '#0d6efd' }}>Featured Products</h4>
                      <p style={{ color: '#555' }}>
                        This could display recommended products or a product catalog for the buyer.
                      </p>
                    </div>
                  </TabPane>

                  {/* ORDER HISTORY TAB */}
                  <TabPane tabId="2">
                    <OrderHistory />
                  </TabPane>

                  {/* PROFILE TAB */}
                  <TabPane tabId="3">
                    <Profile />
                  </TabPane>

                  {/* CART / WISHLIST TAB */}
                  <TabPane tabId="4">
                    <CartWishlist />
                  </TabPane>

                  {/* NOTIFICATIONS TAB */}
                  <TabPane tabId="5">
                    <Notifications />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Inline styles (you can move these into a separate CSS file if preferred)
const styles = {
  pageBackground: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e2e2e2 0%, #c9d6ff 100%)'
  },
  container: {
    padding: '40px 20px'
  },
  card: {
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  cardBody: {
    padding: '30px'
  },
  headerSection: {
    marginBottom: '20px',
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666'
  },
  navPills: {
    justifyContent: 'center',
    marginBottom: '20px'
  },
  navItem: {
    margin: '0 5px'
  },
  navLink: {
    borderRadius: '20px',
    padding: '0.5rem 1rem'
  },
  tabContent: {
    minHeight: '200px'
  },
  placeholder: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#fefefe',
    borderRadius: '5px',
    boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)'
  }
};

export default BuyerDashboard;
