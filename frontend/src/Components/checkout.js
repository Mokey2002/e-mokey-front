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
  Input,
  Form,
  FormGroup,
  Label
} from 'reactstrap';

const Checkout = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);

  
  // Fetch cart data from the server
  const fetchCartData = () => {
    axios
      .get('http://127.0.0.1:8000/api/cart/')
      .then((res) => {
        setCartData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching cart data:', err);
      });
  };

  // Calculate total whenever cartData changes
  useEffect(() => {
    let newTotal = 0;
    cartData.forEach((item) => {
      const price = parseFloat(item.price) || 0;
      newTotal += price * item.quantity;
    });
    setTotal(newTotal);
  }, [cartData]);

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, []);

  // Handle quantity change (update on server)
  const handleQuantityChange = (itemId) => (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (isNaN(newQuantity) || newQuantity <= 0) return;

    axios
      .patch(`http://127.0.0.1:8000/api/update_cart_product_id/${itemId}/`, {
        quantity: newQuantity,
      })
      .then(() => {
        fetchCartData(); // Refresh cart data after successful update
      })
      .catch((err) => {
        console.error('Error updating quantity:', err);
      });
  };

  // Handle deleting an item
  const handleDelete = (itemId) => () => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete_cart_product_id/${itemId}/`)
      .then(() => {
        fetchCartData(); // Refresh cart data
      })
      .catch((err) => {
        console.error('Error deleting product:', err);
      });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 style={{ fontWeight: 'bold', color: '#333' }}>Checkout</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          Review your cart, update quantities, or remove items.
        </p>
      </div>

      {/* Cart Items */}
      <Row className="g-3">
        {cartData.map((item) => (
          <Col key={item.id} sm="6" md="4" lg="3">
            <Card
              style={{
                border: 'none',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease',
                width: '220px',        // <--- Smaller width
                margin: '0 auto'       // Center the card horizontally
              }}
            >
              {/* Smaller image container */}
              <div style={{ overflow: 'hidden', height: '100px' }}>  
                <img
                  alt={item.product_name}
                  src="https://picsum.photos/280/150"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>

              <CardBody style={{ padding: '10px' }}>
                <CardTitle tag="h6" style={{ fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
                  {item.product_name}
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                  style={{ fontSize: '0.8rem' }}
                >
                  Price: ${item.price?.toFixed(2) ?? '0.00'}
                </CardSubtitle>

                {/* Quantity & Subtotal */}
                <CardText
                  tag="div"
                  style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Label for={`quantity-${item.id}`} style={{ margin: 0, fontSize: '0.8rem' }}>
                      Qty:
                    </Label>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      style={{ width: '60px', fontSize: '0.8rem' }}
                      value={item.quantity}
                      onChange={handleQuantityChange(item.id)}
                    />
                  </div>
                </CardText>
              </CardBody>

              <CardFooter
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '6px 12px',
                  borderTop: '1px solid #e9ecef',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: '#333', fontSize: '0.8rem' }}>
                    Subtotal: $
                    {(
                      parseFloat(item.price || 0) * parseFloat(item.quantity || 0)
                    ).toFixed(2)}
                  </span>
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: '#dc3545',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '0.7rem',
                      padding: '5px 10px',
                    }}
                    onClick={handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Display Total */}
      <div className="text-end mt-4" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
        Total: ${total.toFixed(2)}
      </div>

      {/* Payment Form */}
      <div
        style={{
          marginTop: '30px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          margin: '30px auto 0 auto',
        }}
      >
        <h4 style={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Payment Information
        </h4>
        <Form>
          <FormGroup>
            <Label for="cardNumber" style={{ fontSize: '0.9rem' }}>Card Number</Label>
            <Input
              type="text"
              name="cardNumber"
              id="cardNumber"
              placeholder="**** **** **** ****"
              style={{ fontSize: '0.9rem' }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="expiryDate" style={{ fontSize: '0.9rem' }}>Expiry Date</Label>
            <Input
              type="text"
              name="expiryDate"
              id="expiryDate"
              placeholder="MM/YY"
              style={{ fontSize: '0.9rem' }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="cvv" style={{ fontSize: '0.9rem' }}>CVV</Label>
            <Input
              type="text"
              name="cvv"
              id="cvv"
              placeholder="123"
              style={{ fontSize: '0.9rem' }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="cardHolderName" style={{ fontSize: '0.9rem' }}>Card Holder Name</Label>
            <Input
              type="text"
              name="cardHolderName"
              id="cardHolderName"
              placeholder="Enter name on card"
              style={{ fontSize: '0.9rem' }}
            />
          </FormGroup>
          <div className="text-end mt-3">
            <Button color="primary" style={{ marginRight: '10px', fontSize: '0.9rem' }}>
              Submit Payment
            </Button>
            <Button color="secondary" onClick={() => navigate('/landing')} style={{ fontSize: '0.9rem' }}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
