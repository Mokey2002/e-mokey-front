// src/components/dashboardFeatures/CartWishlist.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';

const CartWishlist = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCartAndWishlist();
  }, []);

  const fetchCartAndWishlist = async () => {
    setLoading(true);
    setError('');

    try {
      // Example real API call:
      // const buyerUser = JSON.parse(localStorage.getItem('buyerUser'));
      // const responseCart = await axios.get('http://127.0.0.1:8000/api/cart', {
      //   headers: { Authorization: `Bearer ${buyerUser.token}` }
      // });
      // const responseWishlist = await axios.get('http://127.0.0.1:8000/api/wishlist', {
      //   headers: { Authorization: `Bearer ${buyerUser.token}` }
      // });
      // setCartItems(responseCart.data.items);
      // setWishlistItems(responseWishlist.data.items);

      // Simulated data
      setCartItems([
        { id: 1, name: 'Cart Product 1', price: 20 },
        { id: 2, name: 'Cart Product 2', price: 30 }
      ]);
      setWishlistItems([
        { id: 3, name: 'Wishlist Product 1', price: 10 },
        { id: 4, name: 'Wishlist Product 2', price: 50 }
      ]);
    } catch (err) {
      console.error('Error fetching cart/wishlist:', err);
      setError('Could not load cart or wishlist.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h5>Loading cart & wishlist...</h5>;
  }

  if (error) {
    return <h5 style={{ color: 'red' }}>{error}</h5>;
  }

  return (
    <Row>
      <Col md={6}>
        <h5>Cart Items</h5>
        {!cartItems.length && <p>Your cart is empty.</p>}
        {cartItems.map((item) => (
          <Card key={item.id} style={{ marginBottom: '10px' }}>
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              <CardText>Price: ${item.price}</CardText>
              {/* Additional cart features: remove item, update quantity, etc. */}
            </CardBody>
          </Card>
        ))}
      </Col>

      <Col md={6}>
        <h5>Wishlist Items</h5>
        {!wishlistItems.length && <p>Your wishlist is empty.</p>}
        {wishlistItems.map((item) => (
          <Card key={item.id} style={{ marginBottom: '10px' }}>
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              <CardText>Price: ${item.price}</CardText>
              {/* Additional wishlist features: move to cart, remove item, etc. */}
            </CardBody>
          </Card>
        ))}
      </Col>
    </Row>
  );
};

export default CartWishlist;
