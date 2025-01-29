import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  CardFooter,
} from 'reactstrap';

const Product = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product_id/${location.state.id}/`)
      .then((res) => {
        setProduct(res.data); // Directly use the response
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product data:', err);
        setError('Failed to load product data.');
        setLoading(false);
      });
  }, [location.state.id]);

  const onButtonClick = () => {
    axios
      .post('http://127.0.0.1:8000/api/cart/', {
        user_id: '1',
        product_id: product?.id,
        quantity: '1',
      })
      .then(() => {
        props.setCartIcon(false);
        alert('Product added to cart!');
      })
      .catch((err) => {
        console.error('Error adding product to cart:', err);
        alert('Failed to add product to cart.');
      });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>{error}</div>;
  }

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          maxWidth: '600px',
          borderRadius: '15px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }}
      >
        <img
          alt={product?.product_name}
          src="https://picsum.photos/600/300" // Replace with actual image URL
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
          }}
        />
        <CardBody style={{ padding: '20px' }}>
          <CardTitle
            tag="h3"
            style={{
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginBottom: '15px',
            }}
          >
            {product?.product_name}
          </CardTitle>
          <CardSubtitle
            tag="h6"
            className="mb-3 text-muted"
            style={{
              textAlign: 'center',
              fontSize: '16px',
            }}
          >
            {product?.category || 'Category not specified'}
          </CardSubtitle>
          <CardText
            style={{
              fontSize: '16px',
              color: '#666',
              lineHeight: '1.6',
              textAlign: 'justify',
              marginBottom: '20px',
            }}
          >
            {product?.product_description || 'No description available.'}
          </CardText>
          <CardFooter
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 20px',
              backgroundColor: '#f8f9fa',
              borderTop: '1px solid #e9ecef',
            }}
          >
            <div>
              <strong style={{ fontSize: '18px', color: '#333' }}>Price:</strong>{' '}
              <span style={{ fontSize: '18px', color: '#007bff' }}>${product?.price}</span>
            </div>
            <div>
              <strong style={{ fontSize: '18px', color: '#333' }}>Quantity:</strong>{' '}
              <span style={{ fontSize: '18px', color: '#007bff' }}>{product?.quantity}</span>
            </div>
          </CardFooter>
          <Button
            color="primary"
            size="lg"
            onClick={onButtonClick}
            style={{
              marginTop: '20px',
              width: '100%',
              borderRadius: '25px',
              fontSize: '18px',
              padding: '10px',
            }}
          >
            Add to Cart
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Product;
