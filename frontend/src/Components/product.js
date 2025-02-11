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
  CardFooter,
  Input
} from 'reactstrap';
import useAuth from './hooks/userAuth';

const Product = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to store selected quantity
  //gets user info
  const { loggedIn, user, token } = useAuth();

  useEffect(() => {
    console.log(location)
    axios
      .get(`http://127.0.0.1:8000/api/product/${location.state.id}/`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product data:', err);
        setError('Failed to load product data.');
        setLoading(false);
      });
  }, [location.state.id]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0 && value <= product.quantity) {
      setQuantity(value);
    }
  };

  const onButtonClick = () => {

    try {
      
      const response = axios.post('http://127.0.0.1:8000/api/cart-items/', 
        {
          product_id: location.state.id,
          quantity: quantity
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Item added:', response.data);
    } catch (error) {
      console.error('Error adding item:', error);
    }

    
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
        alignItems: 'center'
      }}
    >
      <Card
        style={{
          maxWidth: '600px',
          borderRadius: '15px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
        }}
      >
        <img
          alt={product?.name}
          src="https://picsum.photos/600/300"
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px'
          }}
        />
        <CardBody style={{ padding: '20px' }}>
          <CardTitle
            tag="h3"
            style={{
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginBottom: '15px'
            }}
          >
            {product?.name}
          </CardTitle>
          <CardSubtitle
            tag="h6"
            className="mb-3 text-muted"
            style={{
              textAlign: 'center',
              fontSize: '16px'
            }}
          >
            {product?.category.name || 'Category not specified'}
          </CardSubtitle>
          <CardText
            style={{
              fontSize: '16px',
              color: '#666',
              lineHeight: '1.6',
              textAlign: 'justify',
              marginBottom: '20px'
            }}
          >
            {product?.description || 'No description available.'}
          </CardText>
          <CardFooter
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 20px',
              backgroundColor: '#f8f9fa',
              borderTop: '1px solid #e9ecef'
            }}
          >
            <div>
              <strong style={{ fontSize: '18px', color: '#333' }}>Price:</strong>{' '}
              <span style={{ fontSize: '18px', color: '#007bff' }}>${product?.price}</span>
            </div>
            <div>
              <strong style={{ fontSize: '18px', color: '#333' }}>Available Stock:</strong>{' '}
              <span style={{ fontSize: '18px', color: '#007bff' }}>{product?.quantity}</span>
            </div>
            <div style={{ marginTop: '10px', width: '100%', textAlign: 'center' }}>
              <Input
                type="number"
                value={quantity}
                min="1"
                max={product?.quantity}
                onChange={handleQuantityChange}
                style={{
                  textAlign: 'center',
                  width: '100px',
                  margin: '10px auto'
                }}
              />
            </div>
          </CardFooter>
          <Button
            color="primary"
            size="lg"
            onClick={onButtonClick}
            disabled={quantity <= 0 || quantity > product?.quantity} // Disable if quantity is invalid
            style={{
              marginTop: '20px',
              width: '100%',
              borderRadius: '25px',
              fontSize: '18px',
              padding: '10px'
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
