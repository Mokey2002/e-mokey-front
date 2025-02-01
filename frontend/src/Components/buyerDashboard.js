import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap';

const BuyerDashboard = () => {
  const [buyerEmail, setBuyerEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const buyerUser = JSON.parse(localStorage.getItem('buyerUser'));

    if (!buyerUser || !buyerUser.token) {
      // If there's no valid token in localStorage, redirect to login
      navigate('/buyerLogin');
      return;
    }

    // Set buyer's email in state (to display a welcome message)
    setBuyerEmail(buyerUser.email);

    // Fetch data for the buyer's dashboard (e.g., recommended products or orders)
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      // Example: Real API endpoint for fetching recommended products, etc.
      // const response = await axios.get('http://127.0.0.1:8000/api/recommendedProducts', {
      //   headers: {
      //     Authorization: `Bearer ${buyerUser.token}`,
      //   },
      // });
      // setProducts(response.data.products);

      // ---- Simulated Data (remove/replace this block for real API call) ----
      const simulatedProducts = [
        {
          id: 1,
          name: 'Sample Product 1',
          category: 'Category A',
          description: 'This is a great product for demonstration.',
          price: 20.99
        },
        {
          id: 2,
          name: 'Sample Product 2',
          category: 'Category B',
          description: 'Another fantastic sample item for your dashboard.',
          price: 45.0
        }
      ];
      setProducts(simulatedProducts);
      // ---- End Simulated Data ----

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h4>Loading your dashboard...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h4 style={{ color: 'red' }}>{error}</h4>
      </div>
    );
  }

  return (
    <Container fluid style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {buyerEmail}!</h2>
          <p>Here are your personalized products or orders.</p>
        </Col>
      </Row>

      <Row>
        {products.map((product) => (
          <Col md={6} lg={4} key={product.id} className="mb-4">
            <Card
              style={{
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                height: '100%'
              }}
            >
              <img
                alt={product.name}
                src="https://picsum.photos/300/200"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderTopLeftRadius: '15px',
                  borderTopRightRadius: '15px'
                }}
              />
              <CardBody>
                <CardTitle tag="h5" style={{ fontWeight: 'bold' }}>
                  {product.name}
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted"
                  style={{ fontSize: '14px' }}
                >
                  {product.category}
                </CardSubtitle>
                <CardText style={{ margin: '10px 0' }}>
                  {product.description}
                </CardText>
                <CardText>
                  <strong>Price: </strong>${product.price.toFixed(2)}
                </CardText>
                <Button color="primary">View Details</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyerDashboard;
