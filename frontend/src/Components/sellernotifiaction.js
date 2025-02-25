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
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('info');
  const sellerAuth = useSelector((state) => state.sellerAuth.loggedIn);

  // Redirect if not logged in
  useEffect(() => {
    if (!sellerAuth) {
      navigate('/login');
    }
  }, [sellerAuth, navigate]);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notifications/');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setAlertMessage('Error fetching notifications.');
      setAlertColor('danger');
      setAlertVisible(true);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/mark-all-read/');
      setAlertMessage('All notifications marked as read!');
      setAlertColor('success');
      setAlertVisible(true);
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      setAlertMessage('Error marking notifications as read.');
      setAlertColor('danger');
      setAlertVisible(true);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <CardBody>
              <CardTitle tag="h3" className="text-center mb-4">
                Notifications
              </CardTitle>
              <div className="text-center mb-3">
                <Button color="primary" onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>{' '}
                <Button color="success" onClick={markAllAsRead}>
                  Mark All as Read
                </Button>
              </div>
              {alertVisible && (
                <Alert
                  color={alertColor}
                  toggle={() => setAlertVisible(false)}
                  fade={false}
                >
                  {alertMessage}
                </Alert>
              )}
              <ListGroup>
                {notifications.length ? (
                  notifications.map((notification, index) => (
                    <ListGroupItem key={index} className={notification.read ? 'text-muted' : ''}>
                      {notification.message} - <small>{notification.date}</small>
                    </ListGroupItem>
                  ))
                ) : (
                  <ListGroupItem className="text-center">
                    No notifications found.
                  </ListGroupItem>
                )}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Notifications;
