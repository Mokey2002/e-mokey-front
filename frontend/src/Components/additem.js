import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Alert,
} from 'reactstrap';
import axios from 'axios';
import sellerAuth from './hooks/sellerAuth';

const AddItem = () => {
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('info');
  const { loggedIn, seller, token } = sellerAuth();

  // Redirect if not logged in
 useEffect(() => {
     if (!loggedIn) {
       navigate('/login');
     }
   }, [sellerAuth,navigate])

  // Create refs for each input
  const itemNameRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const qtyRef = useRef(null);
  const itemIdRef = useRef(null);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: itemNameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      quantity: qtyRef.current.value,
      category_id: itemIdRef.current.value,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/products_seller/', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API Response:', response.data);
      setAlertMessage('Item added successfully!');
      setAlertColor('success');
      setAlertVisible(true);
    } catch (error) {
      console.error('Error submitting the form:', error);
      setAlertMessage('Error submitting the form. Please try again.');
      setAlertColor('danger');
      setAlertVisible(true);
    }
  };


  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <CardBody>
              <CardTitle tag="h3" className="text-center mb-4">
                Add New Item
              </CardTitle>
              {/* Button to navigate to the My Items page */}
              <div className="text-center mb-3">
                <Button color="info" onClick={() => navigate('/myItems')}>
                  My Items
                </Button>
              </div>
              {alertVisible && (
                <Alert
                  color={alertColor}
                  toggle={() => setAlertVisible(false)}
                  fade={false} // Disable fade to avoid timeout warning
                >
                  {alertMessage}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    name="itemName"
                    placeholder="Enter item name"
                    innerRef={itemNameRef}
                    type="text"
                    required
                  />
                </FormGroup>
                <FormGroup>
                <Label for="itemId">Category</Label>
                <Input
                  id="itemId"
                  name="itemId"
                  innerRef={itemIdRef}
                  type="select" // Change input type to select
                  required
                >
                  <option value="1">Electronics</option>
                  <option value="2">Home Decor</option>
                </Input>
              </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="$0.99"
                    innerRef={priceRef}
                    type="number"
                    step="0.01"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    innerRef={descriptionRef}
                    type="textarea"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="qty">Quantity</Label>
                  <Input
                    id="qty"
                    name="qty"
                    defaultValue="1"
                    innerRef={qtyRef}
                    type="select"
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Input>
                </FormGroup>
                <div className="text-center">
                  <Button type="submit" color="primary" className="mr-2">
                    Submit
                  </Button>
                  <Button type="reset" color="secondary">
                    Reset
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddItem;
