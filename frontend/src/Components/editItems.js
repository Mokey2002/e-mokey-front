import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useSelector } from 'react-redux';

const EditItems = () => {
  // Retrieve productId from router state
  const { state } = useLocation();
  const navigate = useNavigate();
  const productId = state?.id;
  const sellerAuth = useSelector((state)=> state.sellerAuth.loggedIn);
  // Redirect if not logged in
 useEffect(() => {
     if (!sellerAuth) {
       navigate('/login');
     }
   }, [sellerAuth,navigate])
  // Local state for form fields
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    product_description: '',
  });

  // Fetch product data for editing
  useEffect(() => {
    if (productId) {
      axios
        .get(`http://127.0.0.1:8000/api/product_id/${productId}/`)
        .then((res) => {
          setProductData(res.data);
        })
        .catch((err) => {
          console.error('Error fetching product data:', err);
        });
    }
  }, [productId]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/product_id/${productId}/`, productData)
      .then(() => {
        console.log('Product updated successfully');
        // Navigate back to MyItems
        navigate('/myitems');
      })
      .catch((err) => {
        console.error('Error updating product:', err);
      });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Basic form layout
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Edit Product</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="category">Category</Label>
          <Input
            type="text"
            name="category"
            id="category"
            value={productData.category}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            type="number"
            name="price"
            id="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="product_description">Description</Label>
          <Input
            type="textarea"
            name="product_description"
            id="product_description"
            value={productData.product_description}
            onChange={handleChange}
          />
        </FormGroup>

        <Button color="primary" type="submit">
          Save Changes
        </Button>
        <Button color="secondary" onClick={() => navigate('/myitems')} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EditItems;
