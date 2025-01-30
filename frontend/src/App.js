import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/home';
import Login from './Components/login';
import Landing from './Components/landing';
import Product from './Components/product';
import Checkout from './Components/checkout';
import AddItem from './Components/additem';
import MyItems from './Components/myitems';
import './App.css';
import { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [cartIcon, setCartIcon] = useState(true);
  const [modal, setModal] = useState(false);
  const [userCart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Track total cart price

  const toggle = () => setModal(!modal);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const handleClick = () => {
    setModal(!modal);

    axios
      .get('http://127.0.0.1:8000/api/cart/')
      .then((res) => {
        console.log(res.data);

        let total = 0; // Initialize total price

        const listItems = res.data.map((item) => {
          total += parseFloat(item.price) * item.quantity; // Calculate total price

          return (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0' }}>
              <span>{item.product_name} (x{item.quantity}) - ${item.price.toFixed(2)}</span>
              <Button color="danger" size="sm" onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
            </li>
          );
        });

        setCart(listItems);
        setTotalPrice(total); // Update total price in state
      })
      .catch((err) => console.error('Error fetching cart data:', err));
  };

  const handleDelete = (product_id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/delete_cart_product_id/${product_id}/`)
      .then((res) => {
        console.log('Item deleted');

        let total = 0; // Recalculate total price
        const listItems = res.data.map((item) => {
          total += item.price * item.quantity;

          return (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0' }}>
              <span>{item.product_name} (x{item.quantity}) - ${item.price.toFixed(2)}</span>
              <Button color="danger" size="sm" onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
            </li>
          );
        });

        setCart(listItems);
        setTotalPrice(total); // Update total price after deletion
      })
      .catch((err) => console.error('Error deleting product:', err));
  };

  return (
    <div className="App">
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="me-auto">
          Mokey
        </NavbarBrand>
        <NavbarBrand>
          {cartIcon ? (
            <div>
              <i className="icon bi-cart" onClick={handleClick}></i>
            </div>
          ) : (
            <div>
              <i className="icon bi-cart-check-fill" onClick={handleClick}></i>
            </div>
          )}
        </NavbarBrand>

        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/Mokey2002?tab=repositories">Mokey</NavLink>
            </NavItem>
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
          <Route path="/additem" element={<AddItem loggedIn={setLoggedIn}  />} />
          <Route path="/myItems" element={<MyItems />} />
        </Routes>
      </BrowserRouter>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Cart</ModalHeader>
        <ModalBody>
          <ul>{userCart}</ul>
          <hr />
          <h5 style={{ textAlign: 'right' }}>Total: ${totalPrice.toFixed(2)}</h5>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Checkout
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
