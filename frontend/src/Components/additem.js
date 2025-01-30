import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const AddItem = ({ loggedIn }) => {
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!loggedIn) {
     navigate('/landing');
    }
  }, [loggedIn, navigate]); // Dependency array ensures this runs only when `loggedIn` changes

  // Create refs for each input
  const itemNameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const qtyRef = useRef();
  const itemIdRef = useRef();
  console.log(loggedIn)
  // Handle form submissiocon
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      product_name: itemNameRef.current.value,
      price: priceRef.current.value,
      product_description: descriptionRef.current.value,
      quantity: qtyRef.current.value,
      product_id: itemIdRef.current.value,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/product/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }

    console.log('Form Data Submitted:', formData);
  };

  if (!loggedIn) {
    return null; // Prevent rendering if not logged in
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup row>
        <Label for="itemName" sm={2}>
          Item Name
        </Label>
        <Col sm={10}>
          <Input
            id="itemName"
            name="itemName"
            placeholder="Enter item name"
            innerRef={itemNameRef}
            type="text"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="itemId" sm={2}>
          Item ID
        </Label>
        <Col sm={10}>
          <Input
            id="itemId"
            name="itemId"
            placeholder="Enter item id"
            innerRef={itemIdRef}
            type="text"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="price" sm={2}>
          Price
        </Label>
        <Col sm={10}>
          <Input
            id="price"
            name="price"
            placeholder="$0.99"
            innerRef={priceRef}
            type="text"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="description" sm={2}>
          Description
        </Label>
        <Col sm={10}>
          <Input
            id="description"
            name="description"
            placeholder="Enter description"
            innerRef={descriptionRef}
            type="textarea"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="qty" sm={2}>
          Qty
        </Label>
        <Col sm={10}>
          <Input id="qty" name="qty" defaultValue="1" innerRef={qtyRef} type="select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col
          sm={{
            offset: 2,
            size: 10,
          }}
        >
          <Button type="submit">Submit</Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default AddItem;
