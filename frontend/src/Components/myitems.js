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

  // Function to fetch data from the server
  const fetchData = () => {
    axios
      .get('http://127.0.0.1:8000/api/product/')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const handleView = (productId) => () => {
    navigate('/product', { state: { id: productId, mode: 'view' } });
  };

  const handleEdit = (productId) => () => {
    navigate('/product', { state: { id: productId, mode: 'edit' } });
  };

  const handleDelete = (productId) => () => {
    axios
      .delete(`http://127.0.0.1:8000/api/product_id/${productId}/`)
      .then(() => {
        console.log('Item deleted');
        fetchData(); // Re-fetch data after successful deletion
      })
      .catch((err) => {
        console.error('Error deleting product:', err);
      });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div className="text-center mb-4">
        <h1 style={{ fontWeight: 'bold', color: '#333' }}>Welcome!</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>Manage your products below.</p>
      </div>
      <Row className="g-3">
        {Pdata.map((product) => (
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
                <CardTitle tag="h6" style={{ fontWeight: 'bold', color: '#333' }}>
                  {product.name}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6" style={{ fontSize: '12px' }}>
                  {product.category || 'Category not specified'}
                </CardSubtitle>
                <CardText style={{ fontSize: '12px', color: '#666' }}>
                  {product.product_description || 'No description available.'}
                </CardText>
              </CardBody>
              <CardFooter
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '8px 12px',
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
                  <span style={{ fontWeight: 'bold', color: '#333' }}>
                    ${product.price}
                  </span>
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: '#007bff',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '12px',
                      padding: '5px 10px',
                    }}
                    onClick={handleView(product.id)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: '#ffc107',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '12px',
                      padding: '5px 10px',
                    }}
                    onClick={handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: '#dc3545',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '12px',
                      padding: '5px 10px',
                    }}
                    onClick={handleDelete(product.id)}
                  >
                    Delete
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
