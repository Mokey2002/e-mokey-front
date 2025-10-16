import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Spinner,
  Alert,
  Button,
} from "reactstrap";
import useUserAuth from "../hooks/useUserAuth";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useUserAuth();
  const [itemsByCart, setItemsByCart] = useState({}); // Store items by cart_id

  useEffect(() => {
    const fetchOrderHistory = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/orders_history/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);

        const ordersData = Array.isArray(response.data.order)
          ? response.data.order
          : [response.data.order];
        setOrders(ordersData);

        // Map items to their respective cart_id
        const mappedItems = {};
        ordersData.forEach((order, index) => {
          mappedItems[order.cart_id] = response.data.items[index] || [];
        });

        setItemsByCart(mappedItems);
      } catch (err) {
        console.error("Error fetching order history:", err);
        setError("Could not load order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner color="primary" />
        <p className="ml-3">Loading order history...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert color="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!orders.length) {
    return (
      <Container className="text-center">
        <h5 className="text-muted">You have no orders yet.</h5>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="text-center text-primary mb-4">🛍️ Your Order History</h3>
      <div className="d-flex flex-wrap justify-content-center">
        {orders.map((order) => (
          <Card key={order.order_id} className="mb-4 mx-2 shadow" style={{ width: "22rem" }}>
            <CardBody>
              <CardTitle tag="h5" className="text-dark">
                Order #{order.order_id}
              </CardTitle>
              <CardText>
                <strong>Date:</strong> {new Date(order.order_date).toLocaleString()}
              </CardText>
              <CardText className="font-weight-bold text-success">
                Total: ${order.order_amount}
              </CardText>
              <strong className="text-dark">Items:</strong>
              <ListGroup className="mb-3">
                {itemsByCart[order.cart_id]?.map((item) => (
                  <ListGroupItem key={item.id} className="d-flex justify-content-between align-items-center">
                    {item.product.name}
                    <span className="badge badge-primary badge-pill">{item.quantity}x</span>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Button color="primary" block>
                View Details
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default OrderHistory;
