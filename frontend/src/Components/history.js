import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Alert,
  Table,
} from 'reactstrap';
import axios from 'axios';

const History = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [soldItems, setSoldItems] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('info');

  // Redirect if not logged in and fetch sold items
  useEffect(() => {
    if (!loggedIn) {
      navigate('/landing');
    } else {
      fetchSoldItems();
    }
  }, [loggedIn, navigate]);

  // Fetch sold items from a dummy API endpoint
  const fetchSoldItems = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/sold-items/');
      setSoldItems(response.data);
    } catch (error) {
      console.error('Error fetching sold items:', error);
      setAlertMessage('Error fetching sold items.');
      setAlertColor('danger');
      setAlertVisible(true);
    }
  };

  // Handle "Sell All Items" button click (example API call)
  const handleSellAll = async () => {
    try {
      // Example API call to resell all sold items
      await axios.post('http://127.0.0.1:8000/api/resell-all/');
      setAlertMessage('All items have been resold!');
      setAlertColor('success');
      setAlertVisible(true);
      // Refresh the sold items list after selling
      fetchSoldItems();
    } catch (error) {
      console.error('Error selling all items:', error);
      setAlertMessage('Error selling all items.');
      setAlertColor('danger');
      setAlertVisible(true);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow">
            <CardBody>
              <CardTitle tag="h3" className="text-center mb-4">
                Sold Items History
              </CardTitle>
              <div className="text-center mb-3">
                <Button color="primary" onClick={() => navigate('/addItem')}>
                  Back to Add Items
                </Button>{' '}
                <Button color="success" onClick={handleSellAll}>
                  Sell All Items
                </Button>
              </div>
              {alertVisible && (
                <Alert
                  color={alertColor}
                  toggle={() => setAlertVisible(false)}
                  fade={false} // Disables the fade transition to avoid the timeout warning
                >
                  {alertMessage}
                </Alert>
              )}
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Item ID</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Date Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {soldItems.length ? (
                    soldItems.map((item, index) => (
                      <tr key={item.product_id || index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.product_name}</td>
                        <td>{item.product_id}</td>
                        <td>${item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.date_sold || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No sold items found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default History;
