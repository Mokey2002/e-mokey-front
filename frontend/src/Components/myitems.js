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
  Spinner,
  Alert,
} from 'reactstrap';
import { useSelector } from 'react-redux';

const MyItems = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [soldCount, setSoldCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [salesError, setSalesError] = useState(null);
  const sellerAuth = useSelector((state)=> state.sellerAuth.loggedIn);

  // Redirect if not logged in
  useEffect(() => {
    
   // console.log(sellerAuth)
    if (!sellerAuth) {
      navigate('/landing');
      
    }
  }, [sellerAuth,navigate]);

  // Fetch products
  const fetchProducts = () => {
    setLoading(true);
    axios
      .get('http://127.0.0.1:8000/api/product/')
      .then((res) => {
        setProducts(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch sales data (items sold & earnings for the month)
  const fetchSalesData = () => {
    axios
      .get('http://127.0.0.1:8000/api/sales/monthly')
      .then((res) => {
        setSoldCount(res.data.sold_count);
        setTotalEarnings(res.data.total_earnings);
        setSalesError(null);
      })
      .catch((err) => {
        console.error('Error fetching sales data:', err);
        setSalesError('Failed to retrieve sales data.');
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchSalesData();
  }, []);

  // Handle Delete
  const handleDelete = (productId) => () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios
        .delete(`http://127.0.0.1:8000/api/product_id/${productId}/`)
        .then(() => {
          fetchProducts(); // Refresh products
        })
        .catch((err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product.');
        });
    }
  };

  // Handle navigation
  const handleView = (productId) => () => navigate('/product', { state: { id: productId, mode: 'view' } });
  const handleEdit = (productId) => () => navigate('/edititems', { state: { id: productId } });
  const handleAddProduct = () => navigate('/additem');

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div className="text-center mb-4">
        <h1 style={{ fontWeight: 'bold', color: '#333' }}>My Items</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>Manage your listed products below.</p>
        <Button color="success" onClick={handleAddProduct} style={{ marginBottom: '20px' }}>
          + Add New Product
        </Button>
      </div>

      {/* Sales Overview Section */}
      <Card
        style={{
          padding: '20px',
          marginBottom: '20px',
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <CardBody className="text-center">
          <h5 style={{ fontWeight: 'bold', color: '#333' }}>Sales This Month</h5>
          {salesError ? (
            <Alert color="danger">{salesError}</Alert>
          ) : (
            <div>
              <h2 style={{ color: '#28a745', fontWeight: 'bold' }}>{soldCount} Items Sold</h2>
              <h4 style={{ color: '#007bff', fontWeight: 'bold' }}>
                Total Earnings: ${totalEarnings.toFixed(2)}
              </h4>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center">
          <Spinner color="primary" />
        </div>
      )}

      {/* Error Message */}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Product List */}
      <Row className="g-3">
        {products.map((product) => (
          <Col key={product.id} sm="6" md="4" lg="3">
            <Card
              style={{
                border: 'none',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease',
              }}
            >
              <div style={{ overflow: 'hidden', height: '150px' }}>
                <img
                  alt={product.name}
                  src={product.image_url || "https://picsum.photos/600/300"}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
              <CardBody style={{ padding: '10px' }}>
                <CardTitle tag="h6" style={{ fontWeight: 'bold', color: '#333' }}>
                  {product.name}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6" style={{ fontSize: '12px' }}>
                  {product.category || 'Category not specified'}
                </CardSubtitle>
                <CardText style={{ fontSize: '12px', color: '#666' }}>
                  {product.product_description || 'No description available.'}
                </CardText>
                <CardText style={{ fontSize: '14px', fontWeight: 'bold', color: '#555' }}>
                  Quantity: {product.quantity ?? 'N/A'}
                </CardText>
              </CardBody>
              <CardFooter style={{ backgroundColor: '#f8f9fa', padding: '8px 12px', borderTop: '1px solid #e9ecef' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontWeight: 'bold', color: '#333' }}>${product.price}</span>
                  <Button size="sm" color="primary" onClick={handleView(product.id)}>View</Button>
                  <Button size="sm" color="warning" onClick={handleEdit(product.id)}>Edit</Button>
                  <Button size="sm" color="danger" onClick={handleDelete(product.id)}>Delete</Button>
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
