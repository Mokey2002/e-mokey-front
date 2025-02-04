import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/home';
import Login from './Components/login';
import Landing from './Components/landing';
import Product from './Components/product';
import Checkout from './Components/checkout';
import AddItem from './Components/additem';
import MyItems from './Components/myitems';
import EditItems from './Components/editItems';
import History from './Components/history';
import BuyerLogin from './Components/buyerlogin';
import BuyerDashboard from './Components/buyerDashboard';
import BuyerRegister from './Components/buyerRegistration';

import './App.css';

import { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const [cartIcon, setCartIcon] = useState(true);
  const [modal, setModal] = useState(false);
  const [userCart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggle = () => setModal(!modal);
  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      setLoggedIn(true);
      setEmail(user.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    setEmail('');
  };

  const handleClick = () => {
    setModal(!modal);

    axios
      .get('http://127.0.0.1:8000/api/cart/')
      .then((res) => {
        let total = 0;
        const listItems = res.data.map((item) => {
          total += parseFloat(item.price) * item.quantity;
          return (
            <li
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 0'
              }}
            >
              <span>
                {item.product_name} (x{item.quantity}) - ${item.price.toFixed(2)}
              </span>
              <Button
                color="danger"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </li>
          );
        });

        setCart(listItems);
        setTotalPrice(total);
      })
      .catch((err) => console.error('Error fetching cart data:', err));
  };

  const handleDelete = (product_id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete_cart_product_id/${product_id}/`)
      .then((res) => {
        console.log('Item deleted');
        handleClick(); // Refresh cart
      })
      .catch((err) => console.error('Error deleting product:', err));
  };

  const handleCheckoutClick = () => {
    toggle();
    window.location.href = '/checkout';
  };

  return (
    <div className="App">
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="me-auto">
          Mokey
        </NavbarBrand>

        <NavbarBrand>
          <i className={`icon bi-${cartIcon ? 'cart' : 'cart-check-fill'}`} onClick={handleClick}></i>
        </NavbarBrand>

        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/landing">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/buyerlogin">Login</NavLink>
            </NavItem>

            {!loggedIn ? (
              <NavItem>
                <NavLink href="/login">Seller Login</NavLink>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <NavLink href="/myItems">My Items</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/additem">Add Item</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/soldItems">Sold History</NavLink>
                </NavItem>
                <NavItem>
                  <Button
                    color="danger"
                    onClick={handleLogout}
                    style={{ marginLeft: '10px' }}
                  >
                    Logout
                  </Button>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/product" element={<Product setCartIcon={setCartIcon} />} />
          <Route path="/checkout" element={<Checkout setCartIcon={setCartIcon} />} />
          <Route path="/additem" element={<AddItem loggedIn={loggedIn} />} />
          <Route path="/myItems" element={<MyItems loggedIn={loggedIn} />} />
          <Route path="/editItems" element={<EditItems loggedIn={loggedIn} />} />
          <Route path="/soldItems" element={<History loggedIn={loggedIn} />} />
          <Route path="/buyerLogin" element={<BuyerLogin setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/buyerRegister" element={<BuyerRegister />} />
          <Route path="/Dashboard" element={<BuyerDashboard />} />
        </Routes>
      </BrowserRouter>

      {/* FOOTER */}
      <footer className="footer mt-5 bg-dark text-light py-4">
        <Container>
          <Row className="text-center">
            <Col md="4">
              <h5>Mokey</h5>
              <p>© {new Date().getFullYear()} Mokey. All rights reserved.</p>
            </Col>
            <Col md="4">
              <h5>Quick Links</h5>
              <NavLink href="/landing" className="text-light">Home</NavLink>
              <NavLink href="/contact" className="text-light">Contact</NavLink>
              <NavLink href="/privacy" className="text-light">Privacy Policy</NavLink>
            </Col>
            <Col md="4">
              <h5>Follow Us</h5>
              <a href="#" className="text-light me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
