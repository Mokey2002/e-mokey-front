import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  CardFooter,
  Button,
} from 'reactstrap';

const MyItems = () => {
  const navigate = useNavigate();
  const [Pdata, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/product/')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const onButtonClick = (productId) => () => {
    navigate('/product', { state: { id: productId } });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div className="text-center mb-5">
        <h1 style={{ fontWeight: 'bold', color: '#333' }}>Welcome!</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>Explore our products below.</p>
      </div>
      <Row className="g-4">
        {Pdata.map((product) => (
          <Col key={product.id} sm="6" md="4" lg="3">
            <Card
              style={{
                border: 'none',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
              }}
              onClick={onButtonClick(product.id)}
              className="hover-card"
            >
              <div style={{ overflow: 'hidden', height: '180px' }}>
                <img
                  alt={product.name}
                  src="https://picsum.photos/300/200"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  className="card-image"
                />
              </div>
              <CardBody style={{ padding: '15px' }}>
                <CardTitle tag="h5" style={{ fontWeight: 'bold', color: '#333' }}>
                  {product.name}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {product.category || 'Category not specified'}
                </CardSubtitle>
                <CardText style={{ fontSize: '14px', color: '#666' }}>
                  {product.product_description || 'No description available.'}
                </CardText>
              </CardBody>
              <CardFooter
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '10px 15px',
                  borderTop: '1px solid #e9ecef',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 'bold', color: '#333' }}>
                      ${product.price}
                    </span>
                    <span style={{ fontSize: '12px', color: '#999' }}> / unit</span>
                  </div>
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: '#007bff',
                      border: 'none',
                      borderRadius: '20px',
                    }}
                  >
                    View
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyItems;
